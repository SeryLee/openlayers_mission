package com.example.openlayers_temp.connection;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.sql.*;

public class DBConnectionTest {

    @Test
    void test() throws SQLException {
        Connection sa = DriverManager.getConnection("jdbc:h2:tcp://localhost/~/test", "sa", "");
        System.out.println("sa = " + sa);
        String sql = "SELECT * FROM MEMBER ";

        PreparedStatement preparedStatement = sa.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        System.out.println("resultSet = " + resultSet);
        Assertions.assertThat(sa).isNotNull();

    }

}
