package com.skipass.journeyservice.integration;

import com.skipass.journeyservice.JourneyServiceApplication;
import com.skipass.journeyservice.business.JourneyService;
import com.skipass.journeyservice.business.impl.JourneyServiceImpl;
import com.skipass.journeyservice.persistance.JourneyEntity;
import com.skipass.journeyservice.persistance.JourneyRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.web.client.RestTemplate;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.Network;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.RabbitMQContainer;
import org.testcontainers.images.PullPolicy;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
@Testcontainers()
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = JourneyServiceApplication.class)

public class DeletePostAndJourneyIntegration {
    @Autowired
    private JourneyRepository repository;
    @Autowired
    private JourneyService journeyService;
    public static Network network =  Network.newNetwork();
    static RabbitMQContainer rabbit = new RabbitMQContainer(DockerImageName
            .parse("ghcr.io/aleksandrakrasteva/rabbitmq:dev")
            .asCompatibleSubstituteFor("rabbitmq"))
            .withImagePullPolicy(PullPolicy.alwaysPull());
    static PostgreSQLContainer journeyPostgres = new PostgreSQLContainer(DockerImageName
            .parse("postgres")).withDatabaseName("journey");
    static PostgreSQLContainer postsPostgres = new PostgreSQLContainer(DockerImageName
            .parse("postgres")).withDatabaseName("posts");
    static GenericContainer postService =  new GenericContainer((DockerImageName
            .parse("ghcr.io/aleksandrakrasteva/post-service:dev")))
            .withImagePullPolicy(PullPolicy.alwaysPull());
    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.rabbitmq.host", rabbit::getHost);
        registry.add("spring.rabbitmq.port", rabbit::getAmqpPort);
        registry.add("spring.rabbitmq.username", rabbit::getAdminUsername);
        registry.add("spring.rabbitmq.password", rabbit::getAdminPassword);
        registry.add("spring.datasource.url", journeyPostgres::getJdbcUrl);
        registry.add("spring.datasource.username", journeyPostgres::getUsername);
        registry.add("spring.datasource.password", journeyPostgres::getPassword);
    }
    @BeforeAll
    public static void setPostService(){
        postsPostgres.withNetwork(network).withNetworkAliases("postdb").start();
        journeyPostgres.withNetwork(network).start();
        rabbit.withNetwork(network).withNetworkAliases("rabbitmq").withStartupTimeout(Duration.ofMinutes(2)).start();
        postService
                .withEnv("spring.datasource.url", "jdbc:postgresql://postdb:5432/posts")
                .withEnv("spring.datasource.username", postsPostgres.getUsername())
                .withEnv("spring.datasource.password", postsPostgres.getPassword())
                .withEnv("spring.rabbitmq.host", "rabbitmq")
                .withEnv("spring.rabbitmq.port", String.valueOf(5672))
                .withEnv("spring.rabbitmq.username", rabbit.getAdminUsername())
                .withEnv("spring.rabbitmq.password", rabbit.getAdminPassword())
                .withNetworkAliases("post-service")
                .withExposedPorts(8080)
                .withNetwork(network)
                .start();

        final String logs = postService.getLogs();
        System.out.println(logs);
    }
    @BeforeEach
    void insertTestData() {
        JourneyEntity journey = journeyService.createJourney("testUser");
        String createPostEndpoint = "http://"
                + postService.getHost()
                + ":"  + postService.getMappedPort(8080)
                + "/create-post";
        RestTemplate restTemplate = new RestTemplate();

        String jsonBody = String.format("{\"text\": \"%s\", \"username\": \"%s\", \"journeyId\": \"%s\" }",
                "this is a nice post", "testUser", journey.getId());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                createPostEndpoint,
                HttpMethod.POST,
                requestEntity,
                String.class
        );
    }
    @Test
    @Tag("integration")
    void deletePostsForUserRabbitMQListenerTest()  {
        Optional<JourneyEntity> before = repository.findById(1L);

        RestTemplate restTemplate = new RestTemplate();

        String deletePostEndpoint = "http://"
                + postService.getHost()
                + ":"  + postService.getMappedPort(8080)
                + "/delete-post";

        String jsonBody = String.format("{\"postId\": \"%s\", \"deleteJourney\": \"%s\" }",
                1, true);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                deletePostEndpoint,
                HttpMethod.DELETE,
                requestEntity,
                String.class);

        Optional<JourneyEntity> after = repository.findById(1L);

        assertEquals(true, before.isPresent() );

        assertEquals(false, after.isPresent());
    }
}