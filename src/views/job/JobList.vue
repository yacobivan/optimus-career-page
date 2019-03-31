<template>
<div>
    <!-- Carousel -->
     <a-carousel autoplay arrows>
         <div
            slot="prevArrow"
            class="slide-arrow"
            style="left: 10px; zIndex: 1">
            <a-icon type="left-circle" />
        </div>
        <div
            slot="nextArrow"
            class="slide-arrow"
            style="right: 10px;">
            <a-icon type="right-circle" />
        </div>
        <div class="slide" v-for="(bannerImage, index) of bannerImages" :key="index">
            <img :src="bannerImage" class="slide__image" />
        </div>
    </a-carousel>
    <div class="section">
        <!-- Greetings -->
        <a-row :gutter="24">
            <a-col span="24" class="section__label">
                <h1 class="heading">{{greeting}}</h1>
                <h2 class="subheading">{{tagline}}</h2>
            </a-col>
        </a-row>
        <!-- Job Positions -->
        <a-row :gutter="24">
            <a-col 
                :xs="jobPostGrid.xs" 
                :md="jobPostGrid.md" 
                v-for="(job, index) of jobs" 
                :key="index"
                class="card-job-container">
                <card-job 
                    :title="job.title" 
                    :department="job.department" 
                    :placementCity="job.placementCity" 
                    :placementCountry="job.placementCountry" 
                    @clickApply="toJobDetail(job.jobPositionId)"
                />
            </a-col>
        </a-row>
        <!-- About -->
        <a-row :gutter="24">
            <a-col span="24" class="section__content">
                <div class="embed-container">
                    <iframe 
                        class="embed-responsive-item"
                        :src="videoUrl" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen />
                </div>
            </a-col>
            <a-col span="24" class="section__content">
                {{about}}
            </a-col>
        </a-row>
    </div>
</div>
</template>

<script>
import CardJob from '../_components/CardJob'
export default {
    data() {
        return {
            greeting: '',
            tagline: '',
            about: '',
            videoUrl: '',
            bannerImages: [],
            image1Url: '',
            image2Url: '',
            image3Url: '',
            jobs: [],
            jobPostGrid: {
                md: {
                    span: 12,
                    offset: 6
                },
                xs: {
                    span: 24
                }
            }
        }
    },
    components: { 
       CardJob
    },
    methods: {
        getCompanyInfo() {
            this.$http.get('/pegadaian/companyDetails')
            .then(response => {
                let res = response.data;
                this.greeting = res.greeting;
                this.tagline = res.tagline;
                this.about = res.about;
                this.videoUrl = this.youtubeUrlParser(res.videoUrl);
                this.image1Url = res.image1Url;
                this.image2Url = res.image2Url;
                this.image3Url = res.image3Url;
                this.bannerImagesCollector();
                this.getJobs(this.companyId);
            })
            .catch(error => {
                console.log(error)
            })
        },
        getJobs(_companyId) {
            this.$http.get('/pegadaian/jobs')
            .then(response => {
                let res = response.data;
                this.jobs = res.jobList;
            })
            .catch(error => {
                console.log(error)
            })
        },
        toJobDetail(_id) {
            this.$router.push({
                name: 'JobDetail',
                params: {
                    id: _id
                }
            })
        },
        youtubeUrlParser(youtubeUrl) {
            return youtubeUrl.replace('watch?v=','embed/')
        },
        bannerImagesCollector() {
            if (this.image1Url != '') {
                this.bannerImages.push(this.image1Url)
            }
            if (this.image2Url != '') {
                this.bannerImages.push(this.image2Url)
            }
            if (this.image3Url != '') {
                this.bannerImages.push(this.image3Url)
            }
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
    margin: 0 auto 48px auto;
    padding: 48px;
    @media screen and (max-width: 767px) {
        padding: 24px;
    }
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
    .section__content {
        text-align: center;
    }
}
.card-job-container {
    margin-bottom: 24px;
}
// Video Player
.embed-container { 
    position: relative; 
    padding-bottom: 56.25%; 
    height: 0; 
    overflow: hidden; 
    max-width: 100%;
    iframe, object, embed {
        position: absolute; 
        top: 50%; 
        left: 50%;
        transform: translate(-50%,-50%);
        width: 80%; 
        height: 80%;
    }
}
// Slide
$slide-height-lg: 480px;
.slide-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: white;
    background-color: rgba(31,45,61,.11);
    opacity: .3;
    transition-duration: 100ms;
    &:before {
        display: none;
    }
    &:hover {
        opacity: .5;
        color: white;
        transition-duration: 300ms;
    }
}
.slide {
    height: auto;
    width: 100%;
    background-color: #212121;
    .slide__image {
        width: 100%;
        height: auto;
        margin: 0 auto;
        object-fit: content;
        object-position: center;
    }
    @media screen and (max-width: 1280px) {
        width: 100%;
        height: auto;
        .slide__image {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    }
}
</style>

