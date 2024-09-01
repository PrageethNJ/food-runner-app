import { useOrderDetails, useUpdateOrder} from '@/api/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import Colors from '@/constants/Colors';
import { OrderStatusList } from '@/types';
import moment from 'moment'
import orders from '@assets/data/orders';
import { Stack, useLocalSearchParams } from 'expo-router';

import {
  FlatList,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();
  const updateStatus = (status: string) => {
    updateOrder({ id: id, updatedFields: { status } });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch</Text>;
  }


  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}

        contentContainerStyle={{ gap: 10 }}

        ListHeaderComponent={() => <OrderListItem order={order} />}

        ListFooterComponent={() => (
          <><Text style={styles.descriptionText}>Total amount    :   Rs. {(order.total).toFixed(2)}</Text>
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 ,paddingHorizontal:5,}}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View>
              <Text style={styles.sectionTitle}>Scheduled Delivery On</Text>
              <Text style={styles.descriptionText}>{moment(order.schedule_time).format('dddd , MMMM Do YYYY ')}at 
              {moment(order.schedule_time).format(' h:mm A')}</Text>
              
              <Text style={styles.sectionTitle}>Customer Details</Text>
              <Text style={styles.descriptionText}>Name                  :   {order.profiles?.full_name}</Text>
              <Text style={styles.descriptionText}>User name         :   {order.profiles?.username}</Text>
              <Text style={styles.descriptionText}>Phone number  :   {order.profiles?.phone_no}</Text>
              <Text style={styles.descriptionText}>Address              :   {order.profiles?.address}</Text>
              
            </View>

          </>
        )}
        
      />

    </View>

  );
}
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    paddingHorizontal:5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    paddingHorizontal:10,
  },
});
