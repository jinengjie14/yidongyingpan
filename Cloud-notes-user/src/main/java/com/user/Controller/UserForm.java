package com.user.Controller;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserForm {
	@NotNull(message="不能为空")
	private String account;
	@NotNull(message="不能为空")
	private String password;
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
}
