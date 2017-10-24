package com.user.Service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.user.Dao.UserDao;
import com.user.Entity.User;
import com.user.Util.MD5;
import com.user.Util.ServiceException;

@Component
@Transactional
public class UserService {
	@Autowired
	private UserDao userDao;
	
	MD5 md5 = new MD5();

	//查找有没有这个账号密码
	public boolean login(String account, String password){
		if(password.equals(""))
			throw new ServiceException("password","password.has.empty");
		User user = userDao.findByAccount(account,"false");
		String new_pass = md5.setmd5(password);
		if(new_pass.equals(user.getPassword())){
			return true;
		}else{
			throw new ServiceException("password","password.has.error");
		}
	}
	//删除session
	public void del_session(HttpSession session,String session_name){
		session.removeAttribute(session_name);
	}
	//设置 session
	public void set_session(HttpSession session,String account){
		del_session(session,"user");
		session.setAttribute("user",account);
	}
}
