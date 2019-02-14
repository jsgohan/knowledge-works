var JobPost = /** @class */ (function () {
    function JobPost(title) {
        this.title = title;
    }
    JobPost.prototype.getTitle = function () {
        return this.title;
    };
    return JobPost;
}());
// observer
var JobSeeker = /** @class */ (function () {
    function JobSeeker(name) {
        this.name = name;
    }
    JobSeeker.prototype.onJobPosted = function (job) {
        console.log("Hi " + this.name + "! New job posted: " + job.getTitle());
    };
    return JobSeeker;
}());
var EmploymentAgency = /** @class */ (function () {
    function EmploymentAgency() {
        this.observers = [];
    }
    EmploymentAgency.prototype.notify = function (jobPosting) {
        this.observers.forEach(function (observer) {
            observer.onJobPosted(jobPosting);
        });
    };
    EmploymentAgency.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    EmploymentAgency.prototype.addJob = function (jobPosting) {
        // 每当得到Job信息，就通知observer
        this.notify(jobPosting);
    };
    return EmploymentAgency;
}());
var johnDoe = new JobSeeker('John Doe');
var janeDoe = new JobSeeker('Jane Doe');
var jobPostings = new EmploymentAgency();
jobPostings.attach(johnDoe);
jobPostings.attach(janeDoe);
jobPostings.addJob(new JobPost('Software Engineer'));
