<template>
<div class="job-detail">
    <a-row :gutter="24">
        <!-- Job Description -->
        <a-col :md="layoutGrid.md" :sm="layoutGrid.sm" class="job-detail__description">
            <div class="description__heading">
                <h1>{{job.title}}</h1>
                <a-tag class="description__tag">
                    <fa icon="briefcase" class="icon"/>
                    {{job.department}}
                </a-tag>
                <a-tag class="description__tag">
                    <fa icon="map-marker" class="icon"/>
                    {{job.placementCity}}, {{job.placementCountry}}
                </a-tag>
                <a-tag class="description__tag" v-show="job.isDisplaySalary==='Y'">
                    <fa icon="money-bill" class="icon"/>
                    {{parseFloat(job.salaryMin) | toCurrency }} - {{parseFloat(job.salaryMax) | toCurrency }}
                </a-tag>
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
        <!-- Job Form -->
        <a-col :md="layoutGrid.md" :sm="layoutGrid.sm" class="job-detail__form">
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
                                <a-select
                                    v-decorator="['birthPlace', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'City of birth should not be empty.'
                                            }
                                        ]
                                    }]"
                                    showSearch
                                    placeholder="Please select city"
                                    @change="handleChange">
                                    <a-select-option 
                                        v-for="(city, value) of cities" 
                                        :key="value" 
                                        :value="city.value">
                                        {{city.text}}
                                    </a-select-option>
                                </a-select>
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
                                    @change="handleChange"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item label="Gender">
                        <a-select
                            v-decorator="['gender', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Gender should not be empty.'
                                    }
                                ]
                            }]"
                            placeholder="Please select gender"
                            @change="handleChange">
                            <a-select-option 
                                v-for="(gender, value) of genders" 
                                :key="value" 
                                :value="gender.value">
                                {{gender.text}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Address Province">
                        <a-select
                            v-decorator="['addressProvince', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Address province should not be empty.'
                                    }
                                ]
                            }]"
                            showSearch
                            placeholder="Please select province"
                            @change="handleChange">
                            <a-select-option 
                                v-for="(province, value) of provinces" 
                                :key="value" 
                                :value="province.value">
                                {{province.text}}
                            </a-select-option>
                        </a-select>
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
                                <a-select
                                    v-decorator="['educationProvince', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'School location should not be empty.'
                                            }
                                        ]
                                    }]"
                                    showSearch
                                    placeholder="Please select province"
                                    @change="handleChange">
                                    <a-select-option 
                                        v-for="(province, value) of provinces" 
                                        :key="value" 
                                        :value="province.value">
                                        {{province.text}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Degree of study">
                                <a-select
                                    v-decorator="['educationDegree', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Degree of study should not be empty.'
                                            }
                                        ]
                                    }]"
                                    placeholder="Please select degree"
                                    @change="handleChange">
                                    <a-select-option 
                                        v-for="(degree, value) of degrees" 
                                        :key="value" 
                                        :value="degree.value">
                                        {{degree.text}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Field of study">
                                <a-select
                                    v-decorator="['educationMajor', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Field of study should not be empty.'
                                            }
                                        ]
                                    }]"
                                    showSearch
                                    placeholder="Please select field of study"
                                    @change="handleChange">
                                    <a-select-option 
                                        v-for="(major, value) of majors" 
                                        :key="value" 
                                        :value="major.value">
                                        {{major.text}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="GPA">
                                <a-input-number 
                                    placeholder="Enter GPA..."
                                    v-decorator="['educationGpa', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter GPA.'
                                            }
                                        ]
                                    }]"
                                    :min="0"
                                    :max="4"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="TOEFL/IELTS/TOEIC Score">
                                <a-input 
                                    placeholder="Example:  TOEFL-500"
                                    v-decorator="['englishScore', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter score.'
                                            }
                                        ]
                                    }]"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <hr>
                    <h3>Other Questions</h3>
                    <a-form-item label="Do you have social media account?">
                        <a-input 
                            placeholder="https://linkedin.com/youraccount..."
                            v-decorator="['socialMediaUrl', {
                                rules: [
                                    {
                                        required: false
                                    }
                                ]
                            }]" 
                        />
                    </a-form-item>
                    <a-form-item label="How do you know Pegadaian opportunity?">
                        <a-textarea 
                            placeholder="Please describe..." 
                            :autosize="{ minRows: 3, maxRows: 5 }" 
                            v-decorator="['source', {
                                rules: [
                                    {
                                        required: false
                                    }
                                ]
                            }]"
                        />
                    </a-form-item>
                    <a-form-item label="How would you build your career in Pegadaian?">
                        <a-textarea 
                            placeholder="Please describe..." 
                            :autosize="{ minRows: 3, maxRows: 5 }" 
                            v-decorator="['questionExpectation', {
                                rules: [
                                    {
                                        required: false
                                    }
                                ]
                            }]"
                        />
                    </a-form-item>
                    <a-form-item label="What do you think of Pegadaian leader should be?">
                        <a-textarea 
                            placeholder="Please describe..." 
                            :autosize="{ minRows: 3, maxRows: 5 }" 
                            v-decorator="['questionIdealism', {
                                rules: [
                                    {
                                        required: false
                                    }
                                ]
                            }]"
                        />
                    </a-form-item>
                    <a-form-item label="What is your vision and mission?">
                        <a-textarea 
                            placeholder="Please describe..." 
                            :autosize="{ minRows: 3, maxRows: 5 }" 
                            v-decorator="['questionVisionMission', {
                                rules: [
                                    {
                                        required: false
                                    }
                                ]
                            }]"
                        />
                    </a-form-item>
                    <a-form-item label="Submit your files">
                        <a-upload 
                            :fileList="file"
                            :multiple="false"
                            :remove="handleRemove"
                            :beforeUpload="beforeUpload"
                            :disabled="file.length>0"
                            v-decorator="['file', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please upload your recent resume.'
                                    }
                                ]
                            }]"
                            @change="handleChangeFile">
                            <a-button :disabled="file.length>0">
                                <a-icon type="upload" /> Select File
                            </a-button>
                        </a-upload>
                    </a-form-item>
                    <div class="excerpt">
                        File should be in ZIP or RAR format, containing these documents:
                        <ul>
                            <li>Curriculum vitae</li>
                            <li>Bachelor certificate (ijazah)</li>
                            <li>Transcript</li>
                            <li>TOEFL / IELTS / TOEIC certificate</li>
                            <li>Photo</li>
                            <li>Identity card (KTP)</li>
                            <li>Surat keterangan dokter</li>
                            <li>Surat keterangan catatan kepolisian</li>
                        </ul>
                        We will not proceed the application if the above attachment is incomplete.
                    </div>
                    <vue-recaptcha 
                        :sitekey="sitekey"
                        ref="recaptcha"
                        @verify="onVerify"
                        @expired="onExpired"
                        size="normal" />
                    <a-form-item>
                        <a-button type="primary" html-type="submit" block :disabled="!isVerified">Drop My CV</a-button>
                    </a-form-item>
                </a-form>
                <span><small>This is a Demo Version, your application will not be submitted.</small></span>
            </a-card>
        </a-col>
    </a-row>
</div>
</template>

<script>
import moment from 'moment';
import params from '../../utils/BusinessParams';
import VueRecaptcha from 'vue-recaptcha';
export default {
    data() {
        return {
            jobId: '',
            job: '',
            jobForm: this.$form.createForm(this),
            genders: [],
            cities: [],
            provinces: [],
            degrees: [],
            majors: [],
            maritalStatuses: [],
            layoutGrid: {
                md: {
                    span: 12
                },
                sm: {
                    span: 24
                }
            },
            file: [],
            responseMessage: {},
            responseError: {},
            sitekey: '6Ld8HpsUAAAAAL-uqBYpboPcHMB8ueDKX8kD540n',
            isVerified: false,
            recaptchaResponse: ''
        }
    },
    components: {
        VueRecaptcha
    },
    methods: {
        getJobDetail() {
            this.jobId = this.$route.params.id;
            this.$http.get('/pegadaian/jobs/' + this.jobId)
            .then(response => {
                let res = response.data;
                this.job = res;
                console.log(this.job)
            })
            .catch(error => {
                console.log(error)
            })
        },
        initBusinessParams() {
            this.genders = params.genders;
            this.cities = params.cities.map(city => ({value: city, text: city}));
            this.provinces = params.provinces.map(province => ({value: province, text: province}));
            this.degrees = params.degrees.map(degree => ({value: degree, text: degree}));
            this.majors = params.fieldOfStudies.map(major => ({value: major, text: major}));
            this.maritalStatuses = params.maritalStatuses.map(maritalStatus => ({value: maritalStatus, text: maritalStatus}));
        },
        destroyBusinessParams() {
            this.genders.destroy();
            this.cities.destroy();
            this.provinces.destroy();
            this.degrees.destroy();
            this.majors.destroy();
            this.maritalStatuses.destroy();
        },
        handleChange(value) {
            console.log('Change', value)
        },
        handleSubmit(e) {
            console.log('Submit!')
            e.preventDefault();
            this.jobForm.validateFields((err, values) => {
                if (!err) {
                    console.log('Values', values);
                    console.log('Date', moment(values.birthDate).format('YYYYMMDD'));
                    let formData = new FormData();
                    formData.append('jobPositionId', this.jobId),
                    formData.append('fullName', values.fullName);
                    formData.append('email', values.email);
                    formData.append('phone', values.phone);
                    formData.append('birthPlace', values.birthPlace);
                    formData.append('birthDate', moment(values.birthDate).format('YYYYMMDD').toString());
                    formData.append('gender', values.gender);
                    formData.append('addressProvince', values.addressProvince);
                    formData.append('educationSchool', values.educationSchool);
                    formData.append('educationCity', values.educationProvince);
                    formData.append('educationDegree', values.educationDegree);
                    formData.append('educationMajor', values.educationMajor);
                    formData.append('educationGpa', values.educationGpa);
                    formData.append('englishScore', values.englishScore);
                    formData.append('socialMediaUrl', values.socialMediaUrl);
                    formData.append('source', values.source);
                    formData.append('questionExpectation', values.questionExpectation);
                    formData.append('questionIdealism', values.questionIdealism);
                    formData.append('questionVisionMission', values.questionVisionMission);
                    formData.append('resumeFile', values.file.file);
                    formData.append('g-recaptcha-response', this.recaptchaResponse);
                    console.log('Form Data', formData.keys());
                    this.$http.post('pegadaian/applicant/apply', formData)
                    .then(response => {
                        this.responseMessage = response.data;
                        console.log(this.responseMessage)
                    })
                    .catch(error => {
                        this.responseError = error;
                        console.log(this.responseError);
                    })
                } else {
                    console.log('Incomplete')
                }
            })
        },
        handleRemove(_file) {
            const index = this.file.indexOf(_file);
            const newFile = this.file.slice();
            newFile.splice(index, 1);
            this.file = newFile;
        },
        handleChangeFile(_file) {
            let fileList = _file.fileList;
            fileList = fileList.splice(-2);
            this.file = fileList;
            console.log('Uploaded', this.file);
        },
        beforeUpload(_file) {
            this.file = [...this.file, _file]
            return false;
        },
        onVerify(response) {
            console.log('Verify', response);
            this.recaptchaResponse = response;
            this.isVerified = true;
        },
        onExpired() {
            console.log('Expired');
            this.resetRecaptcha;
            this.isVerified = false;
        },
        resetRecaptcha() {
            this.$refs.recaptcha.reset();
        }
    },
    created() {
        this.getJobDetail();
        this.initBusinessParams();
    },
    beforeDestroy() {
        this.destroyBusinessParams();
    }
}
</script>

<style lang="scss" scoped>
.job-detail {
    padding: 48px 120px;
    @media screen and (max-width: 767px) {
        padding: 24px 16px;
    }
    .job-detail__description {
        .description__heading {
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #CACACA;
            .description__tag {
                margin-bottom: 4px;
                .icon {
                    margin-right: 4px;
                }
            }
        }
        .description__part {
            margin-bottom: 24px;
        }
    }
}
.excerpt {
    padding: 8px;
    margin-bottom: 16px;
    font-size: 12px;
    line-height: 16px;
    border: 1px dashed #CCCCCC;
    border-radius: 4px;
}
</style>


