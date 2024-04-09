package com.skipass.userservice.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//import org.springframework.web.reactive.config.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.util.Arrays;
//
//@Configuration
//@EnableWebMvc
//public class Security implements WebMvcConfigurer {
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:9000")
//                .allowedHeaders("*")
//                .allowedMethods("POST", "PUT", "DELETE", "HEAD");
//    }
//
//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        // Configure CORS settings
//        config.setAllowedOrigins(Arrays.asList("http://localhost:9000"));
//        // Add more CORS settings if needed
//        source.registerCorsConfiguration("/**", config);
//        return new CorsFilter(source);
//    }
//
//
////    public void addViewControllers(ViewControllerRegistry registry) {
////        registry.addViewController("/signup").setViewName("signup");
////        registry.addViewController("/login").setViewName("login");
////        registry.addViewController("/dashboard").setViewName("dashboard");
////        registry.addViewController("/logout").setViewName("redirect:/");
////    }
//
//}

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        System.out.println("IN FILTER !!!!!!!!!!!!!!!");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        // Configure CORS settings to allow all origins, methods, and headers
        config.setAllowedOrigins(Arrays.asList("http://krakend:8080"));
        config.setAllowedMethods(Arrays.asList("POST", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        // You may need to adjust the following settings based on your requirements
        config.setAllowCredentials(true);
//        config.setMaxAge(3600L);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }C
}


