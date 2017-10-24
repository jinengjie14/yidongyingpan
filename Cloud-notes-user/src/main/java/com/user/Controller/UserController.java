package com.user.Controller;

import java.rmi.server.ServerCloneException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.commons.codec.binary.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.user.Dao.UserDao;
import com.user.Entity.User;
import com.user.Service.UserService;
import com.user.Util.MD5;
import com.user.Util.ServiceException;

@Controller
public class UserController {
	
	@Autowired 
	private UserDao userdao;

	@Autowired 
	private UserService userservice;
	
	User user=new User();
	MD5 md5 = new MD5();
	
	//登录页面
	@GetMapping("/login")
	public String login(){
		return "login";
	}
	
	//注册页面
	@GetMapping("/register")
	public String register(){
		return "register";
	}
	
	//第三方登录，
	@GetMapping("/wxine")
	public String wxine(){
		return "wxine";
	}
	
	//注册
	@ResponseBody //返回的是字符串不是网页
	@RequestMapping(value="/user",method=RequestMethod.POST)
	public String register_in(@Valid RegisterForm RegisterForm, BindingResult result){
		//验证 位数
		if(result.hasErrors()){
			List<JsonResult> arr = new ArrayList<JsonResult>();
			List<ObjectError> list = result.getAllErrors();//getAllErrors获取所有错误的类型放进List里
			for(ObjectError error : list){
				JsonResult jr=new JsonResult();
				FieldError fe = (FieldError)error;
				jr.setField(fe.getField());
				jr.setMessage(fe.getDefaultMessage());
				arr.add(jr);
			}
			return JSON.toJSONString(arr);
		}
		//验证 二次密码
		if(!StringUtils.equals(RegisterForm.getPassword2(),RegisterForm.getPassword())){
			throw new ServiceException("password2","pass2.error");
		}
		//验证 用户是否存在
		User has=userdao.findByAccount(RegisterForm.getAccount(),"false");
		System.out.println(has);
		if(null!=has){
			throw new ServiceException("account","account.has.error");
		}
		user.setId(UUID.randomUUID().toString().replace("-", ""));
		user.setAccount(RegisterForm.getAccount());
		user.setPassword(md5.setmd5(RegisterForm.getPassword()));
		user.setWxine("false");
		userdao.save(user);
		
		return "success";
	}
	
	//第三方登录完的注册
	@ResponseBody
	@RequestMapping(value="/wxine",method=RequestMethod.POST)
	public String wxine_in(HttpSession session,String account,String password){
		//验证 用户是否存在
		User has=userdao.findByAccount(account,"true");
		if(has==null){
			user.setId(UUID.randomUUID().toString().replace("-", ""));
			user.setAccount(account);
			user.setPassword(md5.setmd5(password));
			user.setWxine("true");
			userdao.save(user);
		}
		
		userservice.set_session(session,account);
		
		return "success";
	}
	
	//登录
	@ResponseBody
	@PostMapping("/login")
	public String login_check(HttpSession session,UserForm userForm){
		User user = userdao.findByAccount(userForm.getAccount(),"false");
		if(user != null){
			if(userForm.getPassword().equals(null))
				throw new ServiceException("password","password.has.empty");
		}else{
			throw new ServiceException("account","account.has.not.exists");	
		}
		if(userservice.login(userForm.getAccount(), userForm.getPassword())){
			userservice.set_session(session, userForm.getAccount());
			return "success";
		}else{
			throw new ServiceException("password","password.has.error");
		}
	}
}
	