"use client";
<template>
  <button
    class="join-meeting-btn"
    @click="joinMeeting"
    :disabled="!meetingLink"
  >
    Join Meeting
  </button>
</template>

<script>
export default {
  name: "MeetingJoinButton",
  props: {
    meetingLink: {
      type: String,
      required: true
    }
  },
  methods: {
    joinMeeting() {
      if (this.meetingLink) {
        window.open(this.meetingLink, "_blank");
      }
    }
  }
};
</script>

<style scoped>
.join-meeting-btn {
  background-color: #2563eb;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}
.join-meeting-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
</style>
