import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy data
const meetings = [
  {
    id: 1,
    title: "User Interface Design",
    date: "January 5th, 2024",
    time: "10:00 PM - 11:00 PM",
    startsIn: "35 mins",
    room: "Mark Johson room's",
    attendees: [
      "https://randomuser.me/api/portraits/women/68.jpg",
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/women/32.jpg",
    ],
  },
  {
    id: 2,
    title: "Client Feedback Meeting",
    date: "January 6th, 2024",
    time: "10:00 PM - 11:00 PM",
    startsIn: "1 hour 5 mins",
    room: "Mickel room's",
    attendees: [
      "https://randomuser.me/api/portraits/men/21.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
    ],
  },
];

export default function MeetingPage() {
  const [tab, setTab] = useState("Upcoming");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>+ Create Meeting</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {["On Going", "Upcoming", "Ended"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tab, tab === t && styles.activeTab]}
            >
              <Text style={[styles.tabText, tab === t && styles.activeTabText]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Meeting Cards */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {meetings.map((meeting) => (
            <View key={meeting.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{meeting.title}</Text>
                <Text style={styles.cardTime}>{meeting.startsIn}</Text>
              </View>
              <Text style={styles.cardRoom}>{meeting.room}</Text>
              <Text style={styles.cardDate}>
                {meeting.date} · {meeting.time}
              </Text>

              <View style={styles.attendeesRow}>
                <View style={styles.avatars}>
                  {meeting.attendees.slice(0, 3).map((uri, i) => (
                    <Image
                      key={i}
                      source={{ uri }}
                      style={[styles.avatarSmall, { left: i * 15 }]}
                    />
                  ))}
                  {meeting.attendees.length > 3 && (
                    <View style={[styles.moreAttendees, { left: 3 * 15 }]}>
                      <Text style={styles.moreAttendeesText}>
                        +{meeting.attendees.length - 3}
                      </Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#070722", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  createButton: {
    backgroundColor: "#111133",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },
  createButtonText: { color: "#E9164B", fontWeight: "bold" },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "#111133",
    borderRadius: 12,
  },
  tab: { flex: 1, paddingVertical: 10 },
  activeTab: { backgroundColor: "#E9164B", borderRadius: 12 },
  tabText: { textAlign: "center", color: "#aaa", fontWeight: "bold" },
  activeTabText: { color: "#fff" },

  scroll: { flex: 1 },

  card: {
    backgroundColor: "#111133",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cardTime: { color: "#aaa", fontSize: 14 },
  cardRoom: { color: "#ccc", fontSize: 14, marginBottom: 5 },
  cardDate: { color: "#888", fontSize: 13, marginBottom: 10 },

  attendeesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatars: { flexDirection: "row", position: "relative", height: 40 },
  avatarSmall: {
    width: 35,
    height: 35,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#070722",
    position: "absolute",
  },
  moreAttendees: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#E9164B",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  moreAttendeesText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  joinButton: {
    backgroundColor: "#E9164B",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  joinButtonText: { color: "#fff", fontWeight: "bold" },
});
