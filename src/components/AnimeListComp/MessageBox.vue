<script setup>
import { inject } from 'vue'
inject('messageContent', 'messageState')

const messageState = inject('messageState')
const messageContent = inject('messageContent')
</script>

<template>
    <div class="message-box" v-if="messageState">
        <div class="message-box-content">
            {{ messageContent }}
        </div>
    </div>
</template>

<style scoped lang="scss">
    .message-box {
        position: fixed;
        bottom: 8%;
        left: 5%;
        animation: showMessage 2s ease-in-out forwards 1;
        .message-box-content {
            padding: 10px 30px;
            background-color: white;
            border: 1px solid gray;
            box-shadow: 0 0 3px gray;
            box-sizing: border-box;
            font-size: 20px;
            font-weight: bold;
            border-radius: 8px;
            text-align: center;
        }
    }

    @keyframes showMessage {
        0% {
            opacity: 0;
            bottom: 3%;
        }
        20% {
            opacity: 1;
            bottom: 8%;
        }

        85% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
        
    }
</style>