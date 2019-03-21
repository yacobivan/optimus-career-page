<template>
<div class="job-detail">
    <a-row :gutter="24">
        <a-col :span="12" class="job-detail__description">
            <div class="description__heading">
                <h1>{{job.title}}</h1>
                <a-tag>{{job.department}}</a-tag>
                <a-tag>{{job.placementCity}}, {{job.placementCountry}}</a-tag>
                <a-tag>{{job.salaryCurrency}} {{parseFloat(job.salaryMin) | decimal}} - {{job.salaryMax}}</a-tag>
            </div>
            <div class="description__part">
                <h2 class="j">Job Description</h2>
                <span v-html="job.description" />
            </div>
            <div class="description__part">
                <h2>Requirements</h2>
                <span v-html="job.requirement" />
            </div>
            <div class="description__part">
                <h2>Benefits</h2>
                <span v-html="job.benefit" />
            </div>
        </a-col>
        <a-col :span="12" class="job-detail__form">
            <a-card title="Please complete this form to apply to Pegadaian">
                <a-form :form="jobForm" @submit="handleSubmit">
                    <a-form-item label="Full name">
                        <a-input 
                            placeholder="Enter full name..." 
                            v-decorator="['fullName', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter full name.'
                                    }
                                ]
                            }]"
                        />
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="Email">
                                <a-input 
                                    placeholder="example@email.com..."
                                    v-decorator="['email', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter email address.'
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Phone">
                                <a-input 
                                    placeholder="081000000xxx" 
                                    v-decorator="['phone', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter phone number.'
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="Birth place">
                                <a-input 
                                    placeholder="Enter city of birth..." 
                                    v-decorator="['birthPlace', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter city of birth.'
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Birth date">
                                <a-date-picker 
                                    placeholder="Enter date of birth..."
                                    v-decorator="['birthDate', {
                                        rules: [
                                            { 
                                                type: 'object', 
                                                required: true, 
                                                message: 'Please select date!' 
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item label="Gender">
                        <a-input 
                            placeholder="Male or female..." 
                            v-decorator="['gender', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select gender.'
                                    }
                                ]
                            }]" 
                        />
                    </a-form-item>
                    <a-form-item label="Province">
                        <a-input 
                            placeholder="Enter province address..." 
                            v-decorator="['addressProvince', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select province.'
                                    }
                                ]
                            }]" 
                        />
                    </a-form-item>
                    <hr>
                    <h3>Education Background</h3>
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="Recent education school">
                                <a-input 
                                    placeholder="Universitas Indonesia, Institut Teknologi Bandung..." 
                                    v-decorator="['educationSchool', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please select school.'
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="College / school location">
                                <a-input 
                                    placeholder="Enter city of college / school..." 
                                    v-decorator="['educationCity', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please select city.'
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Degree of study">
                                <a-input 
                                    placeholder="D3, S1, S2, S3, ..." 
                                    v-decorator="['educationDegree', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please select degree.'
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Field of study">
                                <a-input 
                                    placeholder="Enter field of study" 
                                    v-decorator="['educationMajor', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please select field of study.'
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="GPA">
                                <a-input 
                                    placeholder="Enter GPA..."
                                    v-decorator="['educationGpa', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter GPA.'
                                            }
                                        ]
                                    }]" 
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <hr>
                    <h3>Other Questions</h3>
                    <a-form-item label="Are you married?">
                        <a-input 
                            placeholder="Single, married, divorced..."
                            v-decorator="['marriageStatus', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select marital status.'
                                    }
                                ]
                            }]" 
                        />
                    </a-form-item>
                    <a-form-item label="Do you have social media account?">
                        <a-input 
                            placeholder="https://linkedin.com/youraccount..."
                        />
                    </a-form-item>
                    <a-form-item label="How do you know Pegadaian opportunity?">
                        <a-textarea 
                            placeholder="Please describe..." 
                            :autosize="{ minRows: 3, maxRows: 5 }" 
                        />
                    </a-form-item>
                    <a-form-item label="How would you build your career in Pegadaian?">
                        <a-textarea 
                            placeholder="Please describe..." 
                            :autosize="{ minRows: 3, maxRows: 5 }" 
                        />
                    </a-form-item>
                    <a-form-item label="What do you think of Pegadaian leader should be?">
                        <a-textarea 
                            placeholder="Please describe..." 
                            :autosize="{ minRows: 3, maxRows: 5 }" 
                        />
                    </a-form-item>
                    <a-form-item label="What is your vision and mission?">
                        <a-textarea 
                            placeholder="Please describe..." 
                            :autosize="{ minRows: 3, maxRows: 5 }" 
                        />
                    </a-form-item>
                    <a-form-item label="Submit your resume (CV)">
                        <a-upload placeholder="Enter city of birth">
                            <a-button>
                                <a-icon type="upload" /> Click to upload
                            </a-button>
                        </a-upload>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" block>Drop My CV</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            companyId: 'zKeNnbPCk9jiZ/6fiGF7L0hw/lFbiofDyxnO0LO/zsw=',
            jobPositionId: '',
            job: '',
            jobForm: this.$form.createForm(this)
        }
    },
    methods: {
        getJobDetail() {
            this.jobPositionId = this.$route.params.id;
            console.log('Job Position ID', this.jobPositionId);
            this.$http.post('/jobposition/detail', {
                companyId: this.companyId,
                jobPositionId: this.jobPositionId
            })
            .then(response => {
                let res = response.data;
                this.job = res;
                console.log(this.job)
            })
            .catch(error => {
                console.log(error)
            })
        },
        handleSubmit() {
            console.log('Submit!')
        }
    },
    created() {
        this.getJobDetail();
    }
}
</script>

<style lang="scss" scoped>
.job-detail {
    padding: 48px 120px;
    .job-detail__description {
        .description__heading {
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #CACACA;
        }
        .description__part {
            margin-bottom: 24px;
        }
    }
}
</style>


