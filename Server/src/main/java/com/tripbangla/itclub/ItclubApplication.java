package com.tripbangla.itclub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ItclubApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItclubApplication.class, args);
	}

	@GetMapping("/")
	public String apiRoot()
	{
		return "BUBT IT CLUB server running";
	}

}
