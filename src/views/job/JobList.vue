<template>
<div>
   <banner-static 
        :image="bannerStaticImage" 
        :greeting="greeting" 
        :tagline="tagline" 
    />
    <!-- Job Posts -->
    <div class="section">
        <a-row :gutter="24">
            <a-col span="24" class="section__label">
                <h1 class="heading">Available Vacancies</h1>
                <h2 class="subheading">We are seeking talents to fill these positions</h2>
            </a-col>
            <a-col 
                :xs="jobPostGrid.xs" 
                :md="jobPostGrid.md" 
                v-for="(job, index) of jobs" 
                :key="index"
                class="card-job-container"
            >
                <card-job 
                    :title="job.title" 
                    :department="job.department" 
                    :placementCity="job.placementCity" 
                    :placementCountry="job.placementCountry" 
                    @clickApply="toJobDetail(job.jobPositionId)"
                />
            </a-col>
        </a-row>
    </div>
    <div class="section company">
        <a-row>
            <a-col span="24" class="section__label">
                <h1 class="heading">About Pegadaian</h1>
                <!-- <h2 class="subheading">Take a glance to our company profile, seeing is believing</h2> -->
            </a-col>
            <a-col span="24">
                <p class="company__about">{{about}}</p>
                <div class="company__video embed-responsive embed-responsive-16by9">
                    <!-- <iframe class="embed-responsive-item"
                        :src="videoUrl" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen /> -->
                </div>
            </a-col>
        </a-row>
        {{companyId}}
    </div>
</div>
</template>

<script>
import BannerStatic from '../_components/BannerStatic'
import CardJob from '../_components/CardJob'
export default {
    data() {
        return {
            bannerStaticImage: require('../../assets/startup.jpg'),
            companyId: '',
            greeting: '',
            tagline: '',
            about: '',
            videoUrl: '',
            jobs: [],
            jobPostGrid: {
                md: {
                    span: 12
                },
                xs: {
                    span: 24
                }
            },
        }
    },
    components: { 
       BannerStatic,
       CardJob
    },
    methods: {
        getCompanyInfo() {
            this.$http.post('/company/findby/subdomain', {
                subdomain: 'pegadaian'
            })
            .then(response => {
                let res = response.data;
                console.log(res);
                this.companyId = res.companyId;
                this.greeting = res.greeting;
                this.tagline = res.tagline;
                this.about = res.about;
                this.videoUrl = this.youtubeUrlParser(res.videoUrl);
                this.getJobs(this.companyId);
            })
            .catch(error => {
                console.log(error)
            })
        },
        getJobs(_companyId) {
            this.$http.post('/jobposition/listby/company', {
                companyId: _companyId
            })
            .then(response => {
                let res = response.data;
                this.jobs = res.jobList;
            })
            .catch(error => {
                console.log(error)
            })
        },
        toJobDetail(_id) {
            console.log('Apply hit!', _id)
            this.$router.push({
                name: 'JobDetail',
                params: {
                    id: _id
                }
            })
        },
        youtubeUrlParser(youtubeUrl) {
            return youtubeUrl.replace('watch?v=','embed/')
        }
    },
    created() {
        this.getCompanyInfo();
    }
}
</script>

<style lang="scss" scoped>
.section {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 50px;
    .section__label {
        text-align: center;
        margin-bottom: 24px;
        .heading {
            margin-bottom: 0;
        }
        .subheading {
            margin-bottom: 0;
            font-weight: 400;
            color: rgba(0,0,0,.6);
        }
    }
}
.card-job-container {
    margin-bottom: 24px;
}
.company {
    .company__about {
        text-align: center;
    }
    .company__video {
        text-align: center;
    }
}
</style>
