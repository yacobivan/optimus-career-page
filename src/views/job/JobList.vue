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
                    @clickApply="apply(job.id)"
                />
            </a-col>
        </a-row>
    </div>
    <div class="section">
        <a-row>
            <a-col span="24" class="section__label">
                <h1 class="heading">About Pegadaian</h1>
                <h2 class="subheading">Take a glance to our company profile, seeing is believing</h2>
            </a-col>
            <a-col span="24">
                {{aboutCompany}}
            </a-col>
        </a-row>
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
            greeting: 'Hi, noble!',
            tagline: 'Are you ready to be a part of our transformation?',
            jobPostGrid: {
                md: {
                    span: 12
                },
                xs: {
                    span: 24
                }
            },
            aboutCompany: '',
            jobs: [
                {
                    id: '1',
                    title: 'Junior Developer',
                    department: 'Information & Technology',
                    placementCity: 'Jakarta Pusat',
                    placementCountry: 'Indonesia'
                },
                {
                    id: '2',
                    title: 'Senior QA',
                    department: 'Information & Technology',
                    placementCity: 'Jakarta Pusat',
                    placementCountry: 'Indonesia'
                }
            ]
        }
    },
    components: { 
       BannerStatic,
       CardJob
    },
    methods: {
        apply(id) {
            console.log('Apply hit!', id)
        }
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
</style>
