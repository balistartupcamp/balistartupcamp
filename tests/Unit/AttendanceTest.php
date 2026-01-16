<?php

namespace Tests\Unit;

use App\Models\Absensi;
use App\Models\Attendance;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttendanceTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that Attendance model can be created with valid data.
     */
    public function test_can_create_attendance(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'John Doe',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Tech Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data_base64',
            'bukti_foto' => 'photo.jpg',
        ]);

        $this->assertInstanceOf(Attendance::class, $attendance);
        $this->assertEquals('John Doe', $attendance->nama_lengkap);
        $this->assertEquals('12345678', $attendance->nim);
        $this->assertEquals('Computer Science', $attendance->program_studi);
        $this->assertDatabaseHas('attendance', [
            'nama_lengkap' => 'John Doe',
            'nim' => '12345678',
        ]);
    }

    /**
     * Test that Attendance uses UUID as primary key.
     */
    public function test_uses_uuid_as_primary_key(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'UUID Test',
            'nim' => '11111111',
            'program_studi' => 'Information Systems',
            'nama_startup' => 'Startup ABC',
            'nomor_telepon' => '081111111111',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $this->assertIsString($attendance->id);
        $this->assertMatchesRegularExpression(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i',
            $attendance->id
        );
    }

    /**
     * Test that Attendance belongs to an Absensi.
     */
    public function test_attendance_belongs_to_absensi(): void
    {
        $absensi = Absensi::create([
            'title' => 'Bootcamp Day 1',
            'slug' => 'bootcamp-day-1',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Jane Smith',
            'nim' => '87654321',
            'program_studi' => 'Software Engineering',
            'nama_startup' => 'Innovation Labs',
            'nomor_telepon' => '081987654321',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $this->assertInstanceOf(Absensi::class, $attendance->absensi);
        $this->assertEquals($absensi->id, $attendance->absensi->id);
        $this->assertEquals('Bootcamp Day 1', $attendance->absensi->title);
    }

    /**
     * Test that Attendance requires absensi_id.
     */
    public function test_attendance_requires_absensi_id(): void
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        Attendance::create([
            'nama_lengkap' => 'Test User',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Test Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);
    }

    /**
     * Test that Attendance can be updated.
     */
    public function test_can_update_attendance(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Original Name',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Original Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data',
            'bukti_foto' => 'original_photo.jpg',
        ]);

        $attendance->update([
            'nama_lengkap' => 'Updated Name',
            'nama_startup' => 'Updated Startup',
            'bukti_foto' => 'updated_photo.jpg',
        ]);

        $this->assertEquals('Updated Name', $attendance->fresh()->nama_lengkap);
        $this->assertEquals('Updated Startup', $attendance->fresh()->nama_startup);
        $this->assertEquals('updated_photo.jpg', $attendance->fresh()->bukti_foto);
    }

    /**
     * Test that Attendance can be deleted.
     */
    public function test_can_delete_attendance(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'To Be Deleted',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Test Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $id = $attendance->id;
        $attendance->delete();

        $this->assertDatabaseMissing('attendance', [
            'id' => $id,
        ]);
    }

    /**
     * Test that Attendance has timestamps.
     */
    public function test_has_timestamps(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Timestamp Test',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Test Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $this->assertNotNull($attendance->created_at);
        $this->assertNotNull($attendance->updated_at);
    }

    /**
     * Test that Attendance fillable attributes work correctly.
     */
    public function test_fillable_attributes(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $data = [
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Fillable Test',
            'nim' => '99999999',
            'program_studi' => 'Data Science',
            'nama_startup' => 'DataTech',
            'nomor_telepon' => '081999999999',
            'ttd' => 'signature_base64',
            'bukti_foto' => 'test_photo.jpg',
        ];

        $attendance = new Attendance();
        $attendance->fill($data);
        $attendance->save();

        $this->assertEquals('Fillable Test', $attendance->nama_lengkap);
        $this->assertEquals('99999999', $attendance->nim);
        $this->assertEquals('Data Science', $attendance->program_studi);
    }

    /**
     * Test that table name is correct.
     */
    public function test_table_name_is_correct(): void
    {
        $attendance = new Attendance();

        $this->assertEquals('attendance', $attendance->getTable());
    }

    /**
     * Test finding attendance by NIM.
     */
    public function test_can_find_by_nim(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Student One',
            'nim' => '12121212',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Tech One',
            'nomor_telepon' => '081212121212',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $attendance = Attendance::where('nim', '12121212')->first();

        $this->assertNotNull($attendance);
        $this->assertEquals('Student One', $attendance->nama_lengkap);
    }

    /**
     * Test mass assignment protection.
     */
    public function test_mass_assignment_protection(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Mass Assignment Test',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Test Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
            'non_fillable_attribute' => 'This should not be set',
        ]);

        $this->assertArrayNotHasKey('non_fillable_attribute', $attendance->getAttributes());
    }

    /**
     * Test cascade delete when Absensi is deleted.
     */
    public function test_cascade_delete_when_absensi_deleted(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Cascade Test',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Test Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $attendanceId = $attendance->id;
        $absensi->delete();

        $this->assertDatabaseMissing('attendance', [
            'id' => $attendanceId,
        ]);
    }

    /**
     * Test creating multiple attendances for the same absensi.
     */
    public function test_multiple_attendances_for_same_absensi(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        for ($i = 1; $i <= 5; $i++) {
            Attendance::create([
                'absensi_id' => $absensi->id,
                'nama_lengkap' => "Student $i",
                'nim' => "1234567$i",
                'program_studi' => 'Computer Science',
                'nama_startup' => "Startup $i",
                'nomor_telepon' => "08123456789$i",
                'ttd' => "signature_$i",
                'bukti_foto' => "photo_$i.jpg",
            ]);
        }

        $count = Attendance::where('absensi_id', $absensi->id)->count();
        $this->assertEquals(5, $count);
    }
}
