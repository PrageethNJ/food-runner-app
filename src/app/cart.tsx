import React, { useState } from 'react';
import { View, Text, Platform, FlatList, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment'; // Replace dayjs import with moment
import Button from '@/components/Button';
import { useAuth } from '@/providers/AuthProvider';
import { Redirect } from 'expo-router';


const CartScreen = () => {

  //access control part
  const { session, isAdmin, profile} = useAuth();
  if ((profile?.username===null) || (profile?.full_name===null) || (profile?.address===null) || (profile?.phone_no===null)) {
    if (isAdmin) {
      return <Redirect href={'/(admin)/profile'} />;
      }
    else{
      return <Redirect href={'/(user)/profile'} />;
      }
  }

  const { items, total, checkout } = useCart();

  // Schedule meal
  const [isScheduled, setIsScheduled] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null);

  // Show date/time picker
  const showDatePicker = () => setDatePickerVisibility(true);

  // Hide date/time picker
  const hideDatePicker = () => setDatePickerVisibility(false);

  // Handle date/time selection
  const handleConfirm = (date: Date) => {
    // Convert the selected date to UTC and format it to ISO 8601 with timezone (timestampz format)
    const formattedDateTime = moment(date).utc().format(); 
    setSelectedDateTime(formattedDateTime);
    hideDatePicker();
  };

  const handleCheckout = () => {
    const formattedTime = selectedDateTime || moment().utc().format(); // Default to current UTC time if none selected
    checkout(formattedTime); // Pass the formatted time to checkout
    
  };
  
  

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
        Total: Rs. {(total).toFixed(2)}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Switch
          value={isScheduled}
          onValueChange={setIsScheduled}
        />
        <Text style={{ marginLeft: 8 }}>Schedule your meal</Text>
      </View>

      {isScheduled && (
        <>
          <Button text="Select Date and Time" onPress={showDatePicker} />
          <Text style={{ marginVertical: 10 }}>
          {selectedDateTime ? `Selected: ${moment(selectedDateTime).format('YYYY-MM-DD HH:mm')}` : 'No date and time selected'}
          </Text>

          <View style={{backgroundColor:'#assdas'}}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            style={{backgroundColor:'red'}}
            
          />
          </View>
        </>
      )}

      <Button text="Checkout" onPress={handleCheckout} />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;
