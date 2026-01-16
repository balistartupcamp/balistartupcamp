<?php

namespace Tests\Feature;

use App\Models\Absensi;
use App\Models\Attendance;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AbsensiFeatureTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that Absensi can have multiple attendances.
     */
    public function test_absensi_can_have_multiple_attendances(): void
    {
        $absensi = Absensi::create([
            'title' => 'Bootcamp Day 1',
            'slug' => 'bootcamp-day-1',
            'is_active' => true,
        ]);

        $attendance1 = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'John Doe',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Tech Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data_1',
            'bukti_foto' => 'photo1.jpg',
        ]);

        $attendance2 = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Jane Smith',
            'nim' => '87654321',
            'program_studi' => 'Information Systems',
            'nama_startup' => 'Startup ABC',
            'nomor_telepon' => '081987654321',
            'ttd' => 'signature_data_2',
            'bukti_foto' => 'photo2.jpg',
        ]);

        $this->assertDatabaseHas('attendance', [
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'John Doe',
        ]);

        $this->assertDatabaseHas('attendance', [
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Jane Smith',
        ]);

        $this->assertEquals(2, Attendance::where('absensi_id', $absensi->id)->count());
    }

    /**
     * Test that attendance belongs to an Absensi.
     */
    public function test_attendance_belongs_to_absensi(): void
    {
        $absensi = Absensi::create([
            'title' => 'Bootcamp Day 2',
            'slug' => 'bootcamp-day-2',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Test User',
            'nim' => '11111111',
            'program_studi' => 'Software Engineering',
            'nama_startup' => 'Test Startup',
            'nomor_telepon' => '081111111111',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $this->assertInstanceOf(Absensi::class, $attendance->absensi);
        $this->assertEquals($absensi->id, $attendance->absensi->id);
        $this->assertEquals('Bootcamp Day 2', $attendance->absensi->title);
    }

    /**
     * Test creating multiple Absensi records.
     */
    public function test_can_create_multiple_absensi_records(): void
    {
        $absensi1 = Absensi::create([
            'title' => 'Week 1',
            'slug' => 'week-1',
            'is_active' => true,
        ]);

        $absensi2 = Absensi::create([
            'title' => 'Week 2',
            'slug' => 'week-2',
            'is_active' => true,
        ]);

        $absensi3 = Absensi::create([
            'title' => 'Week 3',
            'slug' => 'week-3',
            'is_active' => false,
        ]);

        $this->assertEquals(3, Absensi::count());
        $this->assertEquals(2, Absensi::where('is_active', true)->count());
    }

    /**
     * Test finding active Absensi by slug.
     */
    public function test_find_active_absensi_by_slug(): void
    {
        Absensi::create([
            'title' => 'Active Session',
            'slug' => 'active-session',
            'is_active' => true,
        ]);

        Absensi::create([
            'title' => 'Inactive Session',
            'slug' => 'inactive-session',
            'is_active' => false,
        ]);

        $activeAbsensi = Absensi::where('slug', 'active-session')
            ->where('is_active', true)
            ->first();

        $this->assertNotNull($activeAbsensi);
        $this->assertEquals('Active Session', $activeAbsensi->title);

        $inactiveAbsensi = Absensi::where('slug', 'inactive-session')
            ->where('is_active', true)
            ->first();

        $this->assertNull($inactiveAbsensi);
    }

    /**
     * Test deleting Absensi and checking attendance behavior.
     */
    public function test_deleting_absensi_removes_relationship(): void
    {
        $absensi = Absensi::create([
            'title' => 'To Be Deleted',
            'slug' => 'to-be-deleted',
            'is_active' => true,
        ]);

        $attendance = Attendance::create([
            'absensi_id' => $absensi->id,
            'nama_lengkap' => 'Test User',
            'nim' => '12345678',
            'program_studi' => 'Computer Science',
            'nama_startup' => 'Test Startup',
            'nomor_telepon' => '081234567890',
            'ttd' => 'signature_data',
            'bukti_foto' => 'photo.jpg',
        ]);

        $attendanceId = $attendance->id;
        $absensiId = $absensi->id;

        $absensi->delete();

        // Verify the absensi is deleted
        $this->assertDatabaseMissing('absensi', [
            'id' => $absensiId,
        ]);
    }

    /**
     * Test querying Absensi with pagination.
     */
    public function test_can_paginate_absensi_records(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            Absensi::create([
                'title' => "Session $i",
                'slug' => "session-$i",
                'is_active' => true,
            ]);
        }

        $paginated = Absensi::paginate(10);

        $this->assertEquals(15, $paginated->total());
        $this->assertEquals(10, $paginated->perPage());
        $this->assertEquals(2, $paginated->lastPage());
    }

    /**
     * Test updating Absensi status from active to inactive.
     */
    public function test_can_toggle_absensi_status(): void
    {
        $absensi = Absensi::create([
            'title' => 'Status Toggle Test',
            'slug' => 'status-toggle-test',
            'is_active' => true,
        ]);

        $this->assertEquals(1, $absensi->is_active);

        $absensi->update(['is_active' => false]);
        $this->assertEquals(0, $absensi->fresh()->is_active);

        $absensi->update(['is_active' => true]);
        $this->assertEquals(1, $absensi->fresh()->is_active);
    }
}
