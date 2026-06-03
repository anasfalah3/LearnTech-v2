<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\Language;
use App\Models\Level;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = collect(['Development', 'Design', 'Business'])
            ->map(fn(string $name) => Category::firstOrCreate(['name' => $name]));

        $levels = collect(['Beginner', 'Intermediate', 'Advanced'])
            ->map(fn(string $name) => Level::firstOrCreate(['name' => $name]));

        $languages = collect(['English', 'Spanish', 'French'])
            ->map(fn(string $name) => Language::firstOrCreate(['name' => $name]));

        $author = User::firstWhere('email', 'instructor@learntech.com') ?: User::factory()->create([
            'name' => 'Sample Instructor',
            'email' => 'instructor@learntech.com',
            'password' => bcrypt('password'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);

        $courses = [
            [
                'title' => 'Full-Stack Web Development Bootcamp',
                'description' => 'Learn HTML, CSS, JavaScript, PHP and build real-world web apps from scratch.',
                'price' => 99.99,
                'cross_price' => 149.99,
                'status' => 1,
                'is_featured' => 'yes',
                'image' => null,
                'category_id' => $categories->firstWhere('name', 'Development')->id,
                'level_id' => $levels->firstWhere('name', 'Beginner')->id,
                'language_id' => $languages->firstWhere('name', 'English')->id,
                'requirements' => [
                    ['text' => 'A computer with internet access', 'sort_order' => 1],
                    ['text' => 'Basic familiarity with using a web browser', 'sort_order' => 2],
                    ['text' => 'Willingness to practice coding regularly', 'sort_order' => 3],
                ],
                'outcomes' => [
                    ['text' => 'Build responsive web applications', 'sort_order' => 1],
                    ['text' => 'Work with frontend and backend technologies', 'sort_order' => 2],
                    ['text' => 'Deploy a complete web app', 'sort_order' => 3],
                ],
                'chapters' => [
                    [
                        'title' => 'Getting Started with Web Development',
                        'sort_order' => 1,
                        'lessons' => [
                            ['title' => 'Course Introduction', 'description' => 'Overview of the bootcamp structure and tools.', 'duration' => 10, 'is_free_preview' => 'yes', 'sort_order' => 1],
                            ['title' => 'Setting Up Your Development Environment', 'description' => 'Install and configure the tools you need for web development.', 'duration' => 20, 'is_free_preview' => 'no', 'sort_order' => 2],
                        ],
                    ],
                    [
                        'title' => 'Frontend Fundamentals',
                        'sort_order' => 2,
                        'lessons' => [
                            ['title' => 'HTML Basics', 'description' => 'Create structured pages using HTML.', 'duration' => 25, 'is_free_preview' => 'no', 'sort_order' => 1],
                            ['title' => 'CSS Styling and Layout', 'description' => 'Style pages and build responsive layouts.', 'duration' => 30, 'is_free_preview' => 'no', 'sort_order' => 2],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'UI/UX Design Essentials',
                'description' => 'Master design principles, prototyping, and user research for modern digital products.',
                'price' => 79.99,
                'cross_price' => 119.99,
                'status' => 1,
                'is_featured' => 'no',
                'image' => null,
                'category_id' => $categories->firstWhere('name', 'Design')->id,
                'level_id' => $levels->firstWhere('name', 'Intermediate')->id,
                'language_id' => $languages->firstWhere('name', 'English')->id,
                'requirements' => [
                    ['text' => 'No prior design experience required', 'sort_order' => 1],
                    ['text' => 'Access to a design tool such as Figma', 'sort_order' => 2],
                ],
                'outcomes' => [
                    ['text' => 'Design user-friendly interfaces', 'sort_order' => 1],
                    ['text' => 'Build clickable prototypes', 'sort_order' => 2],
                ],
                'chapters' => [
                    [
                        'title' => 'Design Thinking and User Research',
                        'sort_order' => 1,
                        'lessons' => [
                            ['title' => 'Understanding Users', 'description' => 'Research user needs and pain points.', 'duration' => 20, 'is_free_preview' => 'yes', 'sort_order' => 1],
                            ['title' => 'Design Thinking Process', 'description' => 'Learn the stages of design thinking.', 'duration' => 25, 'is_free_preview' => 'no', 'sort_order' => 2],
                        ],
                    ],
                    [
                        'title' => 'Prototype and Visual Design',
                        'sort_order' => 2,
                        'lessons' => [
                            ['title' => 'Creating Wireframes', 'description' => 'Plan interfaces using low-fidelity wireframes.', 'duration' => 20, 'is_free_preview' => 'no', 'sort_order' => 1],
                            ['title' => 'Building High-Fidelity Designs', 'description' => 'Turn wireframes into polished visuals.', 'duration' => 30, 'is_free_preview' => 'no', 'sort_order' => 2],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Digital Marketing Strategy',
                'description' => 'Build marketing campaigns, learn SEO, social media, and analytics for growth.',
                'price' => 59.99,
                'cross_price' => 89.99,
                'status' => 1,
                'is_featured' => 'no',
                'image' => null,
                'category_id' => $categories->firstWhere('name', 'Business')->id,
                'level_id' => $levels->firstWhere('name', 'Beginner')->id,
                'language_id' => $languages->firstWhere('name', 'English')->id,
                'requirements' => [
                    ['text' => 'Basic computer skills', 'sort_order' => 1],
                    ['text' => 'Interest in digital marketing', 'sort_order' => 2],
                ],
                'outcomes' => [
                    ['text' => 'Create a marketing campaign plan', 'sort_order' => 1],
                    ['text' => 'Analyze performance using metrics', 'sort_order' => 2],
                ],
                'chapters' => [
                    [
                        'title' => 'Marketing Foundations',
                        'sort_order' => 1,
                        'lessons' => [
                            ['title' => 'Marketing Basics', 'description' => 'Understand key marketing concepts and channels.', 'duration' => 20, 'is_free_preview' => 'yes', 'sort_order' => 1],
                            ['title' => 'Customer Segmentation', 'description' => 'Identify target audiences and buyer personas.', 'duration' => 25, 'is_free_preview' => 'no', 'sort_order' => 2],
                        ],
                    ],
                    [
                        'title' => 'Digital Campaign Execution',
                        'sort_order' => 2,
                        'lessons' => [
                            ['title' => 'SEO and Content Strategy', 'description' => 'Improve search visibility with content planning.', 'duration' => 25, 'is_free_preview' => 'no', 'sort_order' => 1],
                            ['title' => 'Social Media Advertising', 'description' => 'Run ads on major social platforms.', 'duration' => 30, 'is_free_preview' => 'no', 'sort_order' => 2],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Advanced JavaScript and Frameworks',
                'description' => 'Deep dive into modern JavaScript, frameworks, and advanced front-end architecture.',
                'price' => 129.99,
                'cross_price' => 179.99,
                'status' => 1,
                'is_featured' => 'yes',
                'image' => null,
                'category_id' => $categories->firstWhere('name', 'Development')->id,
                'level_id' => $levels->firstWhere('name', 'Advanced')->id,
                'language_id' => $languages->firstWhere('name', 'English')->id,
                'requirements' => [
                    ['text' => 'Intermediate JavaScript knowledge', 'sort_order' => 1],
                    ['text' => 'Familiarity with HTML and CSS', 'sort_order' => 2],
                ],
                'outcomes' => [
                    ['text' => 'Build modern JavaScript applications', 'sort_order' => 1],
                    ['text' => 'Use frameworks for scalable frontend apps', 'sort_order' => 2],
                ],
                'chapters' => [
                    [
                        'title' => 'Modern JavaScript Techniques',
                        'sort_order' => 1,
                        'lessons' => [
                            ['title' => 'ES6+ Syntax', 'description' => 'Learn modern JavaScript syntax and patterns.', 'duration' => 25, 'is_free_preview' => 'yes', 'sort_order' => 1],
                            ['title' => 'Asynchronous JavaScript', 'description' => 'Handle async code with promises and async/await.', 'duration' => 30, 'is_free_preview' => 'no', 'sort_order' => 2],
                        ],
                    ],
                    [
                        'title' => 'Frameworks and State Management',
                        'sort_order' => 2,
                        'lessons' => [
                            ['title' => 'Intro to Frameworks', 'description' => 'Compare modern JavaScript frameworks.', 'duration' => 25, 'is_free_preview' => 'no', 'sort_order' => 1],
                            ['title' => 'State Management Patterns', 'description' => 'Manage state in complex frontend apps.', 'duration' => 30, 'is_free_preview' => 'no', 'sort_order' => 2],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($courses as $courseData) {
            $courseAttributes = $courseData;
            unset($courseAttributes['requirements'], $courseAttributes['outcomes'], $courseAttributes['chapters']);

            $course = Course::firstOrCreate([
                'title' => $courseData['title'],
            ], array_merge($courseAttributes, ['user_id' => $author->id]));

            foreach ($courseData['requirements'] as $requirementData) {
                $course->requirements()
                    ->firstOrCreate(['text' => $requirementData['text']], $requirementData);
            }

            foreach ($courseData['outcomes'] as $outcomeData) {
                $course->outcomes()
                    ->firstOrCreate(['text' => $outcomeData['text']], $outcomeData);
            }

            foreach ($courseData['chapters'] as $chapterData) {
                $lessons = $chapterData['lessons'];
                unset($chapterData['lessons']);

                $chapter = $course->chapters()
                    ->firstOrCreate(['title' => $chapterData['title']], $chapterData);

                foreach ($lessons as $lessonData) {
                    $chapter->lessons()
                        ->firstOrCreate(['title' => $lessonData['title']], $lessonData);
                }
            }
        }
    }
}
