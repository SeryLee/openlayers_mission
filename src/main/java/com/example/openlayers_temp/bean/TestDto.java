package com.example.openlayers_temp.bean;

import lombok.Data;

import java.util.List;

@Data
public class TestDto {
    private String name;
    private String type;

    private List<List<List<List<Float>>>> coordinates;

    public TestDto(String name, String type, List<List<List<List<Float>>>> coordinates) {
        this.name = name;
        this.type = type;
        this.coordinates = coordinates;
    }
}
