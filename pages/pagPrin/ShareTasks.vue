<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../static/login.png" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CardShareTask from "~/components/CardTask.vue";
import { namespace } from "vuex-class";
import { CreateTaskInput, Task, User } from "~/gql/graphql";
const Auth = namespace("AuthModule");
const TaskModule = namespace("TaskModule");
@Component({
  components: { CardShareTask },
  layout(context) {
    return "dashboard";
  },
})
export default class ShareTasks extends Vue {}
</script>
<style></style>
