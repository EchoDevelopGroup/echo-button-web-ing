<template>
  <div class="audit-button primary-shadow">
    <img src="@/assets/icon/audit.png" alt="audit" class="audit-button-img">
  </div>
</template>

<script>
export default {
  name: 'AuditButton'
}
</script>

<style>
.audit-button {
  box-sizing: border-box;
  display: flex;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fd507e;
}
.audit-button-img {
  width: auto;
  height: 14px;
}
</style>
