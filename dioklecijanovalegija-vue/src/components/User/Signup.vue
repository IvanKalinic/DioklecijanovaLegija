<template>
  <v-container>
    <!-- <v-layout row>
     
    </v-layout>-->
    <v-layout row>
      <v-col xs12 sm6 offset-sm3>
        <v-col v-if="error" xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-col>

        <v-card class="container" width="550">
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-col xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                      :rules="signUpRules"
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-layout row>
                  <v-col xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                      :rules="signUpRules"
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-layout row>
                  <v-col xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-layout row>
                  <v-col xs12>
                    <v-btn  class="ma-2" type="submit" :loading="loading"  :disabled="loading"  color="info">
                      Sign up
                      <span class="custom-loader">
                        <v-icon v-if="loading" light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-col>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      signUpRules: [
        v => !!v || "This field is required",
        v => v.length >= 7 || "Password should be at least 7 characters long"
      ],
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignup() {
      // Vuex
      // console.log({email:this.email, password: this.password, confirmPassword: this.confirmPassword})
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      console.log("Dismissed alert!");
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

</style>