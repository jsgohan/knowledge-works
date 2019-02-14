class JobPost {
  protected title;

  constructor(title: string) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
}

// observer
class JobSeeker {
  protected name;

  constructor(name: string) {
    this.name = name;
  }

  onJobPosted(job: JobPost) {
    console.log(`Hi ${this.name}! New job posted: ${job.getTitle()}`);
  }
}

class EmploymentAgency {
  protected observers: JobSeeker[] = [];

  notify(jobPosting: JobPost) {
    this.observers.forEach(observer => {
      observer.onJobPosted(jobPosting);
    });
  }

  attach(observer: JobSeeker) {
    this.observers.push(observer);
  }

  addJob(jobPosting: JobPost) {
    // 每当得到Job信息，就通知observer
    this.notify(jobPosting);
  }
}

let johnDoe = new JobSeeker('John Doe');
let janeDoe = new JobSeeker('Jane Doe');

let jobPostings = new EmploymentAgency();
jobPostings.attach(johnDoe);
jobPostings.attach(janeDoe);

jobPostings.addJob(new JobPost('Software Engineer'));
// Hi John Doe! New job posted: Software Engineer
// Hi Jane Doe! New job posted: Software Engineer
