package com.geonhui.memo.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components()
                    .addSecuritySchemes("bearerAuth", new SecurityScheme() // JWT 인증을 위한 Security Scheme 추가 (선택 사항)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")))
                .info(new Info()
                        .title("Your Project API") // API 문서 제목
                        .description("Your Project API 문서입니다.") // API 문서 설명
                        .version("1.0.0")); // API 버전
    }
}