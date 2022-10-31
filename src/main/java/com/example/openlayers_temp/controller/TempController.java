package com.example.openlayers_temp.controller;

import com.example.openlayers_temp.bean.JsonGeometry;
import com.example.openlayers_temp.bean.MapBean;
import com.example.openlayers_temp.bean.TestDto;
import com.example.openlayers_temp.bean.GeoJsonVo;
import com.example.openlayers_temp.service.GeojsonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class TempController {

    private final GeojsonService geojsonService;

    @RequestMapping("/")
    public String TempPage() {
        return "index";
    }

    @PostMapping("/coordinate")
    @ResponseBody
    public ResponseEntity<Object> coordinate(@ModelAttribute MapBean mapBean) {

        MapBean changeMapBean = geojsonService.setUuidToMapBean(mapBean);

        return new ResponseEntity<>(changeMapBean, HttpStatus.OK);
    }


    // TODO response obj 설정
    @ResponseBody
    @GetMapping("/getGeoJSON")
    public List<TestDto> geojson(@ModelAttribute GeoJsonVo geojsonVo,
                                 @ModelAttribute JsonGeometry jsonGeometry) throws IOException {
        // TODO(22.10.04) :: service ->
        // 1. 파일읽기
        return geojsonService.readFileAndGetGeoJsonVo(geojsonVo, jsonGeometry);
    }

}
