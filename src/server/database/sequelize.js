import { Sequelize, DataTypes } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize({
  dialect: "postgres",
  dialectModule: pg,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const Item = sequelize.define(
  "item",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icd10: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    med_history: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    osd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    diagdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    med_records: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    biopsy_location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    biopsy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    broken_bones_complications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    biopsy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tumor_size: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skip_lesion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tumor_vs_limb: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    in_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    out_date_after_surgery: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    side: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ennecking_stage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metastasis_organ: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metastasis_time: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    new_metastasis_organ: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    injection_chamber: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    injection_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    injection_chamber_complications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    main_op_location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_main_surgery_date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_tumor_removal: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tibia_tumor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_main_surgery_date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    upper_head_fibula_cut: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_surgery_time: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_blood_loss_count: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    surgery_complications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    after_surgery_complications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    complications_time: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pre_chem_msts: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pre_op_msts: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    msts_1month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    msts_3month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    msts_6month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },    
    msts_9month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    msts_12month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    msts_15month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    msts_18month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    msts_24month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    second_main_surgery_date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    second_operation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    third_main_surgery_date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    third_operation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lower_limb_difference_after_op: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lower_limb_difference_after_1year: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mrsa_screening_result: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shower_times_before_op: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    op_wound_infection: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    microbiology_results: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    wound_infection_date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pre_treat_gpb: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    after_op_gpb: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    instant_biopsy_results: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    after_op_biopsy_results: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    alive_cells_percentage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tumor_to_nearest_cutting_area_distance: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tumor_to_bone_cutting_area_distance: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vascular_intrusion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    treatment_regimen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preop_chem_regimen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preop_chem_phases: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preop_chem_location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preop_chem_start: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preop_chem_irregularities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preop_chem_patient_after_irregularities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preop_chem_end: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postop_chem_regimen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postop_chem_location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postop_chem_start: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postop_chem_regimen_2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postop_chem_phases: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postop_chem_irregularities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postop_chem_end: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postop_chem_patient_after_irregularities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_re_chem_location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_re_chem_regimen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_re_chem_start: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_re_chem_cycle_count: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_re_chem_end: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_re_chem_irregularities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    second_re_chem_location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    second_re_chem_regimen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    second_re_chem_start: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    second_re_chem_end: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    second_re_chem_irregularities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_end: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_3months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_6months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_9months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_12months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_15months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_18months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_24months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_36months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_48months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_step_status_60months: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    onspot_re_time: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    death_time: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    new_event_time: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    last_checked_date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    next_reexam_day: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    unchem_blood_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    biopsy_bone_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    chem_in_progress_blood_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    post_chem_pre_op_blood_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    no_chem_pre_op_blood_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    op_normal_tissue_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    op_bone_cancer_tissue_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    post_op_blood_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    post_op_chem_blood_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    re_bone_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    re_metastasis_blood_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metastasis_tissue_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metastasis_blood_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_3month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_6month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_9month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_12month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_15month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_18month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_21month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_24month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_27month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_36month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_42month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_48month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_60month: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blood_sample_over5year: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metastasis_tumor_specimen_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fresh_tissue_microfluidics_sample: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);
