package com.notes.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexCollter {

	//首页
	@GetMapping("/index")
	public String index(){
		return "index";
	}
}
