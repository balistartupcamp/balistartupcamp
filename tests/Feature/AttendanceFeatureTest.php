<?php

namespace Tests\Feature;

use App\Models\Absensi;
use App\Models\Attendance;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttendanceFeatureTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test complete attendance submission workflow.
     */
    public function test_complete_attendance_submission_workflow(): void
    {
        $absensi = Absensi::create([
            'title' => 'Bootcamp Day 1',
            'slug' => 'bootcamp-day-1',
            'is_active' => true,
        ]);

        $attendanceData = [
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'John Doe',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'TechVenture',
            'nomor_telepon' => '081234567890',
            'ttd' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            'bukti_foto' => 'attendance_photo.jpg',
        ];

        $attendance = Attendance::create($attendanceData);

        $this->assertInstanceOf(Attendance::class, $attendance);
        $this->assertDatabaseHas('attendance', [
            'nama_lengkap' => 'John Doe',
            'nim' => '12345678',
            'absensi_id' => $absensi->id,
        ]);
        $this->assertEquals('Bootcamp Day 1', $attendance->absensi->title);
    }

    /**
     * Test querying attendances by absensi.
     */
    public function test_query_attendances_by_absensi(): void
    {
        $absensi1 = Absensi::create([
            'title' => 'Session 1',
            'slug' => 'session-1',
            'is_active' => true,
        ]);

        $absensi2 = Absensi::create([
            'title' => 'Session 2',
            'slug' => 'session-2',
            'is_active' => true,
        ]);

        // Create attendances for session 1
        for ($i = 1; $i <= 3; $i++) {
            Attendance::create([
                'absensi_id' => $absensi1->id,
                'nama_lengkap' => "Student $i",
                'nim' => "1111111$i",
                'program_studi' => 'Computer Science',
                'nama_startup' => "Startup $i",
                'nomor_telepon' => "08111111$i",
                'ttd' => "signature_$i",
                'bukti_foto' => "photo_$i.jpg",
            ]);
        }

        // Create attendances for session 2
        for ($i = 1; $i <= 2; $i++) {
            Attendance::create([
                'absensi_id' => $absensi2->id,
                'nama_lengkap' => "Student $i",
                'nim' => "2222222$i",
                'program_studi' => 'Information Systems',
                'nama_startup' => "Company $i",
                'nomor_telepon' => "08222222$i",
                'ttd' => "signature_$i",
                'bukti_foto' => "photo_$i.jpg",
            ]);
        }

        $session1Attendances = Attendance::where('absensi_id', $absensi1->id)->get();
        $session2Attendances = Attendance::where('absensi_id', $absensi2->id)->get();

        $this->assertCount(3, $session1Attendances);
        $this->assertCount(2, $session2Attendances);
    }

    /**
     * Test searching attendance by student details.
     */
    public function test_search_attendance_by_student_details(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Session',
            'slug' => 'test-session',
            'is_active' => true,
        ]);

        Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Alice Johnson',
            'nim' => '11111111',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'AliceTech',
            'nomor_telepon' => '081111111111',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Bob Smith',
            'nim' => '22222222',
            'program_studi' => 'Information Systems',
            'nama_startup' => 'BobCorp',
            'nomor_telepon' => '082222222222',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $attendanceByName = Attendance::where('nama_lengkap', 'like', '%Alice%')->first();
        $attendanceByNim = Attendance::where('nim', '22222222')->first();

        $this->assertNotNull($attendanceByName);
        $this->assertEquals('Alice Johnson', $attendanceByName->nama_lengkap);
        $this->assertNotNull($attendanceByNim);
        $this->assertEquals('Bob Smith', $attendanceByNim->nama_lengkap);
    }

    /**
     * Test filtering attendances by program studi.
     */
    public function test_filter_attendances_by_program_studi(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Session',
            'slug' => 'test-session',
            'is_active' => true,
        ]);

        Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'CS Student 1',
            'nim' => '11111111',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Startup 1',
            'nomor_telepon' => '081111111111',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'CS Student 2',
            'nim' => '22222222',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Startup 2',
            'nomor_telepon' => '082222222222',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'IS Student',
            'nim' => '33333333',
            'program_studi' => 'Information Systems',
            'nama_startup' => 'Startup 3',
            'nomor_telepon' => '083333333333',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $csAttendances = Attendance::where('program_studi', 'Computer Science')->get();
        $isAttendances = Attendance::where('program_studi', 'Information Systems')->get();

        $this->assertCount(2, $csAttendances);
        $this->assertCount(1, $isAttendances);
    }

    /**
     * Test attendance pagination.
     */
    public function test_attendance_pagination(): void
    {
        $absensi = Absensi::create([
            'title' => 'Large Session',
            'slug' => 'large-session',
            'is_active' => true,
        ]);

        for ($i = 1; $i <= 25; $i++) {
            Attendance::create([
                'absensi_id' => $absensi->id,
                'nama_lengkap' => "Student $i",
                'nim' => sprintf('%08d', $i),
                'program_studi' => 'Computer Science',
                'nama_startup' => "Startup $i",
                'nomor_telepon' => "081" . sprintf('%09d', $i),
                'ttd' => "signature_$i",
                'bukti_foto' => "photo_$i.jpg",
            ]);
        }

        $paginated = Attendance::where('absensi_id', $absensi->id)->paginate(10);

        $this->assertEquals(25, $paginated->total());
        $this->assertEquals(10, $paginated->perPage());
        $this->assertEquals(3, $paginated->lastPage());
    }

    /**
     * Test attendance count per absensi.
     */
    public function test_attendance_count_per_absensi(): void
    {
        $absensi = Absensi::create([
            'title' => 'Popular Session',
            'slug' => 'popular-session',
            'is_active' => true,
        ]);

        $attendanceCount = 10;
        for ($i = 1; $i <= $attendanceCount; $i++) {
            Attendance::create([
                'absensi_id' => $absensi->id,
                'nama_lengkap' => "Student $i",
                'nim' => sprintf('%08d', $i),
                'program_studi' => 'Computer Science',
                'nama_startup' => "Startup $i",
                'nomor_telepon' => "081" . sprintf('%09d', $i),
                'ttd' => "signature_$i",
                'bukti_foto' => "photo_$i.jpg",
            ]);
        }

        $count = Attendance::where('absensi_id', $absensi->id)->count();

        $this->assertEquals($attendanceCount, $count);
    }

    /**
     * Test updating attendance signature and photo.
     */
    public function test_update_attendance_signature_and_photo(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Session',
            'slug' => 'test-session',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Update Test',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Test Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'original_signature',
            'bukti_foto' => 'original_photo.jpg',
        ]);

        $attendance->update([
            'ttd' => 'updated_signature_base64',
            'bukti_foto' => 'updated_photo.jpg',
        ]);

        $this->assertEquals('updated_signature_base64', $attendance->fresh()->ttd);
        $this->assertEquals('updated_photo.jpg', $attendance->fresh()->bukti_foto);
    }

    /**
     * Test checking if NIM already submitted attendance for specific absensi.
     */
    public function test_check_duplicate_attendance_by_nim(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Session',
            'slug' => 'test-session',
            'is_active' => true,
        ]);

        Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Student One',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Startup One',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $exists = Attendance::where('absensi_id', $absensi->id)
            ->where('nim', '12345678')
            ->exists();

        $notExists = Attendance::where('absensi_id', $absensi->id)
            ->where('nim', '99999999')
            ->exists();

        $this->assertTrue($exists);
        $this->assertFalse($notExists);
    }

    /**
     * Test getting latest attendances.
     */
    public function test_get_latest_attendances(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Session',
            'slug' => 'test-session',
            'is_active' => true,
        ]);

        // Create attendances with delay to ensure different timestamps
        $firstAttendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'First Student',
            'nim' => '11111111',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Startup 1',
            'nomor_telepon' => '081111111111',
            'ttd' => 'signature_1',
            'bukti_foto' => 'photo_1.jpg',
        ]);

        sleep(1);

        $secondAttendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Second Student',
            'nim' => '22222222',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Startup 2',
            'nomor_telepon' => '082222222222',
            'ttd' => 'signature_2',
            'bukti_foto' => 'photo_2.jpg',
        ]);

        $latestAttendance = Attendance::where('absensi_id', $absensi->id)
            ->latest()
            ->first();

        $this->assertEquals('Second Student', $latestAttendance->nama_lengkap);
    }
}
