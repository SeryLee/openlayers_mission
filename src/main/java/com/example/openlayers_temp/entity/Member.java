package com.example.openlayers_temp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
//@Table
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String name;

    private String address;

    public Member(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public Member() {

    }
}
