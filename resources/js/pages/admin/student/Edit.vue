<template>
  <div>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <Breadcrumbs/>

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title"></h3>
                </div>

                <form>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="name">Mã sinh viên</label>
                      <input
                        type="text"
                        class="form-control"
                        id="code"
                        placeholder="Nhập mã sinh viên."
                        name="code"
                        v-model="student.code"
                        :class="{ 'is-invalid': errors.code }"
                      />
                      <span
                        v-if="errors.code"
                        id="exampleInputEmail1-error"
                        class="error invalid-feedback"
                        >{{ errors.code[0] }}</span
                      >
                    </div>
                    <div class="form-group">
                      <label for="name">Họ tên</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Nhập họ tên."
                        name="name"
                        v-model="student.name"
                        :class="{ 'is-invalid': errors.name }"
                      />
                      <span
                        v-if="errors.name"
                        id="exampleInputEmail1-error"
                        class="error invalid-feedback"
                        >{{ errors.name[0] }}</span
                      >
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Nhập email."
                        name="email"
                        v-model="student.email"
                        :class="{ 'is-invalid': errors.email }"
                      />
                      <span
                        v-if="errors.email"
                        id="exampleInputEmail1-error"
                        class="error invalid-feedback"
                        >{{ errors.email[0] }}</span
                      >
                    </div>
                    <div class="form-group">
                      <label for="phone">Số điện thoại</label>
                      <input
                        type="tel"
                        class="form-control"
                        id="phone"
                        placeholder="Nhập số điện thoại."
                        name="phone"
                        v-model="student.phone"
                        :class="{ 'is-invalid': errors.phone }"
                      />
                      <span
                        v-if="errors.phone"
                        id="exampleInputEmail1-error"
                        class="error invalid-feedback"
                        >{{ errors.phone[0] }}</span
                      >
                    </div>
                    <div class="form-group">
                      <label for="dept">Tên khoa</label>
                      <b-form-select
                        v-model="student.dept_id"
                        :options="departments"
                        text-field="name"
                        value-field="id"
                        :class="{ 'is-invalid': errors.dept_id }"
                        @change="getCLASS()"
                      >
                        <template #first>
                          <b-form-select-option :value="null" disabled
                            >-- Chọn khoa --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
                      <span
                        v-if="errors.dept_id"
                        id="exampleInputEmail1-error"
                        class="error invalid-feedback"
                        >{{ errors.dept_id[0] }}</span
                      >
                    </div>
                    <div class="form-group">
                      <label for="class">Tên lớp</label>
                        <multiselect v-model="student.class" :class="{ 'is-invalid': errors.class_id }" selectLabel="Nhấn enter hoặc click để chọn" selectedLabel="Đang được chọn" noOptions="Trống" deselectLabel="Nhấn enter hoặc click để bỏ chọn" :options="CLASS" placeholder="Chọn lớp" label="name" track-by="name"></multiselect>

                      <span
                        v-if="errors.class_id"
                        id="exampleInputEmail1-error"
                        class="error invalid-feedback"
                        >{{ errors.class_id[0] }}</span
                      >
                    </div>
                  </div>

                  <div class="card-footer">
                    <button @click.prevent="submit()" class="btn btn-primary">
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Multiselect from 'vue-multiselect';
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      errors: {},
      CLASS: [],
    };
  },
  async created() {
    await this.getStudent(this.$route.params.id);
    await this.getDepartments();
    await this.getCLASS();
    window.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        this.submit();
      }
    });
  },
  methods: {
    ...mapActions("student", ["getStudent"]),
    ...mapActions("department", ["getDepartments"]),
    async submit() {
      try {
        await this.$store.dispatch("student/edit", this.student);
        this.$swal({
          title: "Thành công",
          text: "Sửa thành công.",
          icon: "success",
          showConfirmButton: false,
          position: "top-end",
          timer: 1000,
          width: 360,
        });

        this.$router.push({
          name: "student.index",
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    getCLASS() {
      this.CLASS = this.departments.find(
        (item) => item.id == this.student.dept_id
      ).class;
    },
  },
  computed: {
    ...mapGetters("student", ["student"]),
    ...mapGetters("department", ["departments"]),
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

