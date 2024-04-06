//package com.skipass.postmanagement.integration;
//
//import com.skipass.postmanagement.PostManagementApplication;
//import com.skipass.postmanagement.messaging.RabbitMQProducer;
//import com.skipass.postmanagement.persistance.PostEntity;
//import com.skipass.postmanagement.persistance.PostRepository;
//import org.junit.Rule;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.test.context.DynamicPropertyRegistry;
//import org.springframework.test.context.DynamicPropertySource;
//import org.springframework.test.context.event.annotation.BeforeTestExecution;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.reactive.server.WebTestClient;
//import org.springframework.web.client.RestTemplate;
//import org.testcontainers.containers.GenericContainer;
//import org.testcontainers.containers.Network;
//import org.testcontainers.containers.PostgreSQLContainer;
//import org.testcontainers.containers.RabbitMQContainer;
//import org.testcontainers.containers.wait.strategy.Wait;
//import org.testcontainers.images.builder.ImageFromDockerfile;
//import org.testcontainers.junit.jupiter.Container;
//import org.testcontainers.junit.jupiter.Testcontainers;
//import org.testcontainers.shaded.com.google.common.graph.NetworkBuilder;
//import org.testcontainers.utility.DockerImageName;
//import java.nio.file.Paths;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//
//@Testcontainers
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(
//        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
//        classes = PostManagementApplication.class)
//public class UserServiceIntegration {
//
//    @Autowired
//    private  PostRepository repository;
//    private static final String rabbitMQImage = "rabbitmq:management";
//    public static Network network =  Network.newNetwork();
//    static RabbitMQContainer rabbit = new RabbitMQContainer(DockerImageName.parse(rabbitMQImage));
//    static PostgreSQLContainer userPostgres = new PostgreSQLContainer(DockerImageName.parse("postgres"));
//
//    static PostgreSQLContainer postsPostgres = new PostgreSQLContainer(DockerImageName.parse("postgres")).withDatabaseName("posts");
//
//    static GenericContainer userService =  new GenericContainer((DockerImageName.parse("ghcr.io/aleksandrakrasteva/user-service:main")));
//
//    @DynamicPropertySource
//    static void registerProperties(DynamicPropertyRegistry registry) {
//        registry.add("spring.rabbitmq.host", rabbit::getHost);
//        registry.add("spring.rabbitmq.port", rabbit::getAmqpPort);
//        registry.add("spring.rabbitmq.username", rabbit::getAdminUsername);
//        registry.add("spring.rabbitmq.password", rabbit::getAdminPassword);
//        registry.add("spring.datasource.url", postsPostgres::getJdbcUrl);
//        registry.add("spring.datasource.username", postsPostgres::getUsername);
//        registry.add("spring.datasource.password", postsPostgres::getPassword);
//    }
//
//
////    GenericContainer userService = new GenericContainer(
////            new ImageFromDockerfile()
////                    .withFileFromPath("Dockerfile", Paths.get("../../../../../../../../UserService/Dockerfile")))
////            .withEnv("spring.rabbitmq.host", rabbit.getHost())
////            .withEnv("spring.rabbitmq.port", String.valueOf(rabbit.getAmqpPort()))
////            .withEnv("spring.rabbitmq.username", rabbit.getAdminUsername())
////            .withEnv("spring.rabbitmq.password", rabbit.getAdminPassword())
////            .withEnv("spring.datasource.url", postgres.getJdbcUrl())
////            .withEnv("spring.datasource.username", postgres.getUsername())
////            .withEnv("spring.datasource.password", postgres.getPassword());
//
////        new GenericContainer((DockerImageName.parse("ghcr.io/aleksandrakrasteva/user-service:main")))
//
//
//    @BeforeAll
//    private static void  setUserService (){
//        postsPostgres.withNetwork(network).start();
//        userPostgres.withNetwork(network).start();
//        rabbit.withNetwork(network).start();
//
//        userService.withEnv("spring.rabbitmq.host", rabbit.getContainerName().substring(1))
////                .withEnv("spring.rabbitmq.port", String.valueOf(5672))
//                .withEnv("spring.rabbitmq.username", rabbit.getAdminUsername())
//                .withEnv("spring.rabbitmq.password", rabbit.getAdminPassword())
//                .withEnv("spring.datasource.url", "jdbc:postgresql:/"+ userPostgres.getContainerName() + ":5432/test?loggerLevel=OFF")
//                .withEnv("spring.datasource.username", userPostgres.getUsername())
//                .withEnv("spring.datasource.password", userPostgres.getPassword())
//                .withExposedPorts(8080)
//                .withNetwork(network)
//                .start();
//    }
//
//    @BeforeEach
//    void insertTestData() {
//        PostEntity post = PostEntity.builder().text("").userId(1l).build();
//        repository.save(post);
//    }
//
//    @Test
//    void connectToStuff() throws InterruptedException {
//        List<PostEntity> before = repository.getPostEntitiesByUserIdIs(1);
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String deleteUserProfileEndpoint = "http://"
//                + userService.getHost()
//                + ":"  + userService.getMappedPort(8080)
//                + "/delete/1";
//
//        System.out.println(deleteUserProfileEndpoint);
//
//        restTemplate.delete(deleteUserProfileEndpoint);
//        restTemplate.delete(deleteUserProfileEndpoint);
//        restTemplate.delete(deleteUserProfileEndpoint);
//        restTemplate.delete(deleteUserProfileEndpoint);
//        restTemplate.delete(deleteUserProfileEndpoint);
//
//
//        List<PostEntity> posts = repository.getPostEntitiesByUserIdIs(1);
//
//        assertEquals(1, before.size());
//
//        assertEquals(0, posts.size());
//    }
//
//    // user service tries to connect to rabbitmq
//    //    CachingConnectionFactory       : Attempting to connect to: [/wonderful_moore:5672]
//    // userService tries to connect to rabbitmq and cant resolve the name
//
//}
