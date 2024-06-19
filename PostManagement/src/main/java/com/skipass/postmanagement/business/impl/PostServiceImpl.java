package com.skipass.postmanagement.business.impl;

import com.skipass.postmanagement.business.PostService;
import com.skipass.postmanagement.domain.*;
import com.skipass.postmanagement.messaging.RabbitMQProducer;
import com.skipass.postmanagement.persistance.PostEntity;
import com.skipass.postmanagement.persistance.PostRepository;
import com.skipass.postmanagement.persistance.ReactionEntity;
import com.skipass.postmanagement.persistance.ReactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final ReactionRepository reactionRepository;
    private final RabbitMQProducer producer;
    @Override
    public List<Post> getPostsForUser(String username) {
        List<Post> posts = postRepository.getPostEntitiesByUsernameIs(username).
                stream().map(this::convertToPost).collect(Collectors.toList());
        return posts;
    }

    private Post convertToPost(PostEntity post) {
        List<ReactionEntity> reactionEntities = reactionRepository.getReactionEntitiesByPostIdIs(post.getId());
        List<Reaction> reactions = reactionEntities.stream().map(this::convertReactions).collect(Collectors.toList());

        Post postDto = Post.builder().id(post.getId()).journeyId(post.getJourneyId())
                .text(post.getText()).username(post.getUsername()).reactions(reactions).build();
        return postDto;
    }

    private Reaction convertReactions(ReactionEntity reaction){
        return Reaction.builder().postId(reaction.getPostId())
                .id(reaction.getId())
                .creator(reaction.getCreator()).build();
    }
    @Override
    public List<Post> getAllPosts() {
        List<Post> posts = postRepository.findAll().
                stream().map(this::convertToPost).collect(Collectors.toList());
        return posts;

    }
    @Override
    public void deletePostById(DeletePostRequest postRequest) {
        Optional<PostEntity> post = postRepository.findById(postRequest.getPostId());
        if(post.isPresent()){
            if(post.get().getJourneyId() != 0 & postRequest.isDeleteJourney()){
                producer.sendDeleteJourneyMessage(post.get().getJourneyId());
            }
            postRepository.deleteById(postRequest.getPostId());
            reactionRepository.deleteAllByPostIdIs(postRequest.getPostId());
        }
    }
    @Override
    public CreatePostResponse createPost(CreatePostRequest request) {
        PostEntity post = PostEntity.builder().text(request.getText()).username(request.getUsername())
                .journeyId(request.getJourneyId()).build();
            var response = postRepository.save(post);
            return CreatePostResponse.builder().id(response.getId()).build();
    }
    @Override
    public void deletePostsForUser(DeletePostsRequest request) {
        if(request.isDeleteJourney()){
            List<PostEntity> posts = postRepository.getPostEntitiesByUsernameIs(request.getUsername());
            for(int i = 0; i<posts.size();  i++){
                if(posts.get(i).getJourneyId() != 0) {
                    producer.sendDeleteJourneyMessage(posts.get(i).getJourneyId());
                }
            }
        }
        postRepository.deletePostEntitiesByUsernameIs(request.getUsername());
        reactionRepository.deleteAllByCreatorIs(request.getUsername());
    }

    @Override
    public Long updatePostById(UpdatePostRequest request) {
        Optional<PostEntity> post = postRepository.findById(request.getPostId());
        if(post.isPresent()){
            post.get().setText(request.getText());
            PostEntity updated =  postRepository.save(post.get());
            return updated.getId();
        }
        return null;
    }

    @Override
    public void deletePostForJourney(long journeyId) {
        Optional<PostEntity> post = postRepository.getPostEntityByJourneyIdIs(journeyId);

        if(post.isPresent()){
            DeletePostRequest request = DeletePostRequest.builder().deleteJourney(false).postId(post.get().getId()).build();
            deletePostById(request);
        }
        
    }
}