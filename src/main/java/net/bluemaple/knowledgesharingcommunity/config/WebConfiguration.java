package net.bluemaple.knowledgesharingcommunity.config;

import net.bluemaple.knowledgesharingcommunity.interceptor.IllegalRequestInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Resource
    private IllegalRequestInterceptor illegalRequestInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(illegalRequestInterceptor).
                addPathPatterns("/**").
                excludePathPatterns("/api/login","/api/register","/api/checkLogin","/api/logout");
    }
}
