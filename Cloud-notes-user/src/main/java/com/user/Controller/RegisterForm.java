package com.user.Controller;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class RegisterForm {
	@NotNull(message="不能为空")
	@Size(min=3,message="不少于3个字符")
	private String account;
	@NotNull(message="不能为空")
	@Size(min=3,message="不少于3个字符")
	private String password;
	@NotNull(message="不能为空")
	@Size(min=3,message="不少于3个字符")
	private String password2;
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPassword2() {
		return password2;
	}
	public void setPassword2(String password2) {
		this.password2 = password2;
	}
}
