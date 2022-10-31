package com.example.openlayers_temp.service;

import com.example.openlayers_temp.bean.JsonGeometry;
import com.example.openlayers_temp.bean.MapBean;
import com.example.openlayers_temp.bean.TestDto;
import com.example.openlayers_temp.bean.GeoJsonVo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Slf4j
@Service
public class GeojsonService {

    public List<TestDto> readFileAndGetGeoJsonVo(GeoJsonVo vo, JsonGeometry jsonGeometry) throws IOException {
        // 1. 파일 버퍼 생성
        BufferedReader reader = getBufferedReader();
        // 2. String -> mapper ObjMapper Json
        List<GeoJsonVo> geoJsonVos = getGeojsonVoFromFile(reader);

        //TODO(22.10.05) ::
        // 1. 단일 객체 -> List 변환 지도에 행정동 그리기
        // 2. java stream -> map 원하는 DTO전달

        List<TestDto> result = geoJsonVos.stream()
                //map은 스트림 내 요소들을 하나씩 특정 값으로 변환
                //collect는 결과물을 재처리하는 역할, toList는 자료들을 리스트 형태로 반환
                //filter는 스트림 내 요소들을 하나씩 평가해서 걸러내는 작업
                .map(n ->
                        new TestDto(n.getType(),
                                n.getJsonDongProperties().getAdmDrNm(),
                                n.getGeometry().getCoordinates())
                ).collect(Collectors.toList());
        return result;
    }

    private static List<GeoJsonVo> getGeojsonVoFromFile(BufferedReader reader) throws IOException {
        List<GeoJsonVo> result = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        String line;

        while((line = reader.readLine())!= null){
            try {
                // 3. 값 메핑작업/ 변환
                GeoJsonVo geoJson = mapper.readValue(line, GeoJsonVo.class);
                // 4. 리스트 추가
                result.add(geoJson);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    public MapBean setUuidToMapBean(MapBean mapBean) {
        String uuid = createUuid();
        mapBean.setUuid(uuid);
        mapBean.setName("selab");
        return mapBean;
    }

    private String createUuid() {
        String resultUuid = "";

        try {
            UUID uuid = UUID.randomUUID();
            resultUuid = uuid.toString().replaceAll("-", "");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return resultUuid;
    }
    private BufferedReader getBufferedReader() throws FileNotFoundException {
        File file = new File("C:\\dong.geojsonl.json");
        BufferedReader reader = new BufferedReader(new FileReader(file));
        return reader;
    }

}
