package net.bluemaple.knowledgesharingcommunity.handler;

import net.bluemaple.knowledgesharingcommunity.uniformData.UniformMessage;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * 统一的异常处理，将异常情况通知给前端
 */
@ControllerAdvice
public class UniformExceptionHandler {
    @ExceptionHandler(Exception.class)
    public UniformMessage handleException(Exception e){
        return new UniformMessage(500,"An error occurred on the server",e.getMessage());
    }
}
