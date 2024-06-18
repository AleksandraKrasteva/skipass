package com.skipass.postmanagement.business.impl;

import com.skipass.postmanagement.business.PostService;
import com.skipass.postmanagement.domain.*;
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
    public void deletePostById(long postId) {
        postRepository.deleteById(postId);
        //delete all reactions
    }
    @Override
    public CreatePostResponse createPost(CreatePostRequest request) {
        PostEntity post = PostEntity.builder().text(request.getText()).username(request.getUsername())
                .journeyId(request.getJourneyId()).build();
            var response = postRepository.save(post);
            return CreatePostResponse.builder().id(response.getId()).build();
    }
    @Override
    public void deletePostsForUser(String username) {

        postRepository.deletePostEntitiesByUsernameIs(username);
        //delete all reactions
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
}