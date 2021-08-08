package net.ukr.kondrashev.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebMainController {
    @RequestMapping(value = "/authorization")
    public String authorization() {
        return "index";
    }
    @RequestMapping(value = "/registration")
    public String registration() {
        return "index";
    }
    @RequestMapping(value = "/alerts")
    public String alerts() {
        return "index";
    }
    @RequestMapping(value = "/admin")
    public String adminPage() {
        return "index";
    }
    @RequestMapping(value = "/user")
    public String userPage() {
        return "index";
    }
    @RequestMapping(value = "/logout")
    public String logout() {
        return "index";
    }
}
