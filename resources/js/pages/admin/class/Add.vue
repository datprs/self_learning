<template>
  <div>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <Breadcrumbs />

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
                      <label for="dept">Tên khoa</label>
                      <b-form-select
                        v-model="CLASS.dept_id"
                        :options="departments"
                        text-field="name"
                        value-field="id"
                        :class="{ 'is-invalid': errors.dept_id }"
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
                      <label for="name">Tên lớp</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Nhập tên lớp."
                        name="name"
                        v-model="CLASS.name"
                        :class="{ 'is-invalid': errors.name }"
                      />
                      <span
                        v-if="errors.name"
                        id="exampleInputEmail1-error"
                        class="error invalid-feedback"
                        >{{ errors.name[0] }}</span
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
export default {
  data() {
    return {
      CLASS: {
        name: "",
        dept_id: null,
      },
      errors: {},
      selected: null,
    };
  },
  created() {
    this.getDepartments();
    if (this.$route.params.dept_id) {
      this.CLASS.dept_id = this.$route.params.dept_id;
    }
    window.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        this.submit();
      }
    });
  },
  methods: {
    ...mapActions("department", ["getDepartments"]),
    async submit() {
      try {
        await this.$store.dispatch("CLASS/add", this.CLASS);
        this.$swal({
          title: "Thành công",
          text: "Thêm thành công.",
          icon: "success",
          showConfirmButton: false,
          position: "top-end",
          timer: 1000,
          width: 360,
        });
        this.CLASS = {
          name: "",
          dept_id: null,
        };
        this.errors = {
          name: null,
          dept_id: null,
        };
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
  computed: {
    ...mapGetters("department", ["departments"]),
  },
};
</script>
