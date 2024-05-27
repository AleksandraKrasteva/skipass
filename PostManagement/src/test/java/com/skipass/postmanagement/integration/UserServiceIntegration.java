//package com.skipass.postmanagement.integration;
//
//import com.skipass.postmanagement.PostManagementApplication;
//import com.skipass.postmanagement.persistance.PostEntity;
//import com.skipass.postmanagement.persistance.PostRepository;
//import org.apache.catalina.filters.CorsFilter;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Tag;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Profile;
//import org.springframework.core.env.Environment;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.DynamicPropertyRegistry;
//import org.springframework.test.context.DynamicPropertySource;
//import org.springframework.web.client.RestTemplate;
//import org.testcontainers.containers.*;
//import org.testcontainers.images.PullPolicy;
//import org.testcontainers.junit.jupiter.Testcontainers;
//import org.testcontainers.utility.DockerImageName;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@Testcontainers()
//@SpringBootTest(
//        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
//        classes = PostManagementApplication.class)
//public class UserServiceIntegration {
//
//    @Autowired
//    private  PostRepository repository;
//    public static Network network =  Network.newNetwork();
//
//    static RabbitMQContainer rabbit = new RabbitMQContainer(DockerImageName
//            .parse("ghcr.io/aleksandrakrasteva/rabbitmq:main")
//            .asCompatibleSubstituteFor("rabbitmq"))
//            .withImagePullPolicy(PullPolicy.alwaysPull());
//    static PostgreSQLContainer userPostgres = new PostgreSQLContainer(DockerImageName
//            .parse("postgres")).withDatabaseName("users");
//    static PostgreSQLContainer postsPostgres = new PostgreSQLContainer(DockerImageName
//            .parse("postgres")).withDatabaseName("posts");
//    static GenericContainer userService =  new GenericContainer((DockerImageName
//            .parse("ghcr.io/aleksandrakrasteva/user-service:ci-setup")))
//            .withImagePullPolicy(PullPolicy.alwaysPull());
//
//    static GenericContainer krakendContainer = new GenericContainer(DockerImageName
//            .parse("ghcr.io/aleksandrakrasteva/krakend_test:ci-setup"))
//            .withImagePullPolicy(PullPolicy.alwaysPull());
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
//    @BeforeAll
//    public static void setUserService(){
//        postsPostgres.withNetwork(network).start();
//        userPostgres.withNetwork(network).withNetworkAliases("userdb").start();
//        rabbit.withNetwork(network).withNetworkAliases("rabbitmq").start();
//        userService
//                .withEnv("spring.profiles.active", "test")
//                .withEnv("spring.datasource.url", "jdbc:postgresql://userdb:5432/users")
//                .withEnv("spring.datasource.username", userPostgres.getUsername())
//                .withEnv("spring.datasource.password", userPostgres.getPassword())
//                .withEnv("spring.rabbitmq.host", "rabbitmq")
//                .withEnv("spring.rabbitmq.username", rabbit.getAdminUsername())
//                .withEnv("spring.rabbitmq.password", rabbit.getAdminPassword())
//                .withNetworkAliases("user-service")
//                .withExposedPorts(8080)
//                .withNetwork(network)
//                .start();
//
//        krakendContainer.withNetwork(network).withNetworkAliases("krakend").withExposedPorts(8080)
//                .start();
//
//        final String logs = userService.getLogs();
//        System.out.println(logs);
//    }
//
//    @BeforeEach
//    void insertTestData() {
//        PostEntity post = PostEntity.builder().text("").userId(1l).build();
//        repository.save(post);
//    }
//
//    @Test
//    @Tag("integration")
//    void deletePostsForUserRabbitMQListenerTest()  {
//
//        List<PostEntity> before = repository.getPostEntitiesByUserIdIs(1);
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String deleteUserProfileEndpoint = "http://"
//                + krakendContainer.getHost()
//                + ":"  + krakendContainer.getMappedPort(8080)
//                + "/delete-profile/1";
//
//        restTemplate.delete(deleteUserProfileEndpoint);
//
//        final String logs = userService.getLogs();
//        System.out.println(logs);
//
//        List<PostEntity> posts = repository.getPostEntitiesByUserIdIs(1);
//
//        assertEquals(1, before.size());
//
//        assertEquals(0, posts.size());
//    }
//
//}
