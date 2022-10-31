package com.example.openlayers_temp.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class GeoJsonVo {

    @JsonProperty("type")
    private String type;
    @JsonProperty("properties")
    private JsonDongProperties jsonDongProperties;
    @JsonProperty("geometry")
    private JsonGeometry geometry;

}
