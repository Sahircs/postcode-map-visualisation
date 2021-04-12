import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { handleInvalidSearch } from "../actions";

const InvalidSearchAlert = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const invalidSearch: boolean = useSelector(
    (state: RootState) => state.invalidSearch
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={invalidSearch}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              The Postcode entered was not valid!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => dispatch(handleInvalidSearch(false))}
            >
              <Text style={styles.textStyle}>Close Alert</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
});

export default InvalidSearchAlert;
