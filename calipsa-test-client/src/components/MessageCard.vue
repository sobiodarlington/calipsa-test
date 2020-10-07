<template>
<div class="mt-4">
  <b-card no-body class="overflow-hidden ml-auto mr-auto" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="12">
        <b-card-body>
          <b-card-text class="text-info">
            {{ message }}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
export default {
  name: "MessageCard",
  props: {
    message: String,
  },
};
</script>
