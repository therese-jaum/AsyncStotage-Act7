
import React from 'react';
import { View } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const CustomTable = ({ dataList, onViewData }) => { 
  const tableHead = ['#', '            FIRST NAME                   ', '             LAST NAME                   ', '          COURSE             '];

  return (
    <View style={{ marginTop: 20, justifyContent: 'flex-start', flex: 1, marginHorizontal: 5 }}>
      <Table borderStyle={{ borderWidth: 0, borderColor: '#C1C0B9' }} style={{ marginTop: 10, width: '100%' }}>
        <Row
          data={tableHead}
          style={{ height: 60, backgroundColor: '#6600cc', width: '100%' }}
          textStyle={{ margin: 8, textAlign: 'center', color: 'white' }}
        />
        {dataList.map((data, index) => (
          <Row
            key={index}
            data={[index + 1, data.firstName, data.lastName, data.selectedCourse]}
            style={{ height: 40 }}
            textStyle={{
              margin: 1,
              textAlign: 'center',
              flexWrap: 'wrap',
              color: '#333',
              fontFamily: 'Montserrat',
              lineHeight: '3.0',
            }}
            onPress={() => onViewData(index)}
          />
        ))}
      </Table>
    </View>
  );
};

export default CustomTable;
