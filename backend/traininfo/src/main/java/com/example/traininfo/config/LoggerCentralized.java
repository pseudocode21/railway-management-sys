package com.example.traininfo.config;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
 
import com.fasterxml.jackson.databind.ObjectMapper;
 
@Aspect
@Component
public class LoggerCentralized {
	
	Logger log = LoggerFactory.getLogger(LoggerCentralized.class);
	
	@Pointcut(value = "execution(* com.railway.traininfo.config.*.*.*(..))")
	public void myPointcut() {
		// Pointcut excludes all classes in com.ct.auth.security package (filters, etc.)
	}
	
	@Around("myPointcut()")
	public Object applicationLogger(ProceedingJoinPoint pjp) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		String methodName = pjp.getSignature().getName();
		String className = pjp.getTarget().getClass().toString();
		Object[] array = pjp.getArgs();
		String argsString;
		try {
			argsString = mapper.writeValueAsString(array);
		} catch (Exception e) {  
			argsString = java.util.Arrays.toString(array);
		           }
		log.info("Method invoked: " + className + " : " + methodName + "()" + " arguments : " + argsString);
		Object object = pjp.proceed( );
		String responseString;
		try {
			responseString = mapper.writeValueAsString(object);
		} catch (Exception e) {
			responseString = String.valueOf(object);
		}
		log.info(className + " : " + methodName + "()" + " Response : " + responseString);
		return object;
	}
}