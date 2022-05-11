## Knowledge Sharing Community
### 介绍
这是一个知识分享社区
### 技术栈
前端：react@18.0、react-router-dom v6、redux、react-quilljs、react-bootstrap、axios
后端：SpringBoot、Mybatis、commons-codec
对象存储：MinIO (Docker部署)
### 部署说明
使用前后端分离的方式部署，前端部署在nginx上，将api请求转发给SpringBoot，将文件对象请求转发给MinIO
### application.yml说明
```yaml
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/xxx?useSSL=true&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8
    username: root
    password: root
    hikari:
      max-lifetime: 120000  # 毫秒级
  transaction:
    rollback-on-commit-failure: true
  redis:
    host: localhost
mybatis:
  configuration:
    map-underscore-to-camel-case: true
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: net.bluemaple.knowledgesharingcommunity.pojo

# OSS的配置，它被手动注入到配置类中的，而不是自动配置的
minio:
  end-point: # MinIO访问地址
  access-key: # MinIO账户
  secret-key: # MinIO密码
  bucket-name: # 指定bucket
server:
  servlet:
    session:
      cookie:
        max-age: 3600s   # 保留session一个小时
```