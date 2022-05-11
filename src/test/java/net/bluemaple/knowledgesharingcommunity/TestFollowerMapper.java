package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.mapper.FollowerRelationshipMapper;
import net.bluemaple.knowledgesharingcommunity.service.FollowerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestFollowerMapper {

    @Autowired
    private FollowerRelationshipMapper followerRelationshipMapper;
    @Test
    public void test(){
//        System.out.println(followerRelationshipMapper.getFollowerList(1));
        System.out.println(followerRelationshipMapper.getTargetList(2));
    }
}
