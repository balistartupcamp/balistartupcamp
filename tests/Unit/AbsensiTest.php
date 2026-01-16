<?php

namespace Tests\Unit;

use App\Models\Absensi;
use App\Models\Attendance;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AbsensiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that Absensi model can be created with valid data.
     */
    public function test_can_create_absensi(): void
    {
        $absensi = Absensi::create([
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);

        $this->assertInstanceOf(Absensi::class, $absensi);
        $this->assertEquals('Test Absensi', $absensi->title);
        $this->assertEquals('test-absensi', $absensi->slug);
        $this->assertTrue($absensi->is_active);
        $this->assertDatabaseHas('absensi', [
            'title' => 'Test Absensi',
            'slug' => 'test-absensi',
            'is_active' => true,
        ]);
    }

    /**
     * Test that Absensi uses UUID as primary key.
     */
    public function test_uses_uuid_as_primary_key(): void
    {
        $absensi = Absensi::create([
            'title' => 'UUID Test',
            'slug' => 'uuid-test',
            'is_active' => true,
        ]);

        $this->assertIsString($absensi->id);
        $this->assertMatchesRegularExpression(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i',
            $absensi->id
        );
    }

    /**
     * Test that slug must be unique.
     */
    public function test_slug_must_be_unique(): void
    {
        Absensi::create([
            'title' => 'First Absensi',
            'slug' => 'unique-slug',
            'is_active' => true,
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);

        Absensi::create([
            'title' => 'Second Absensi',
            'slug' => 'unique-slug',
            'is_active' => true,
        ]);
    }

    /**
     * Test that is_active can be set explicitly.
     */
    public function test_is_active_can_be_set_explicitly(): void
    {
        $absensi = Absensi::create([
            'title' => 'Active Test',
            'slug' => 'active-test',
            'is_active' => true,
        ]);

        $this->assertEquals(1, $absensi->is_active);
    }

    /**
     * Test that Absensi can be set to inactive.
     */
    public function test_can_set_absensi_to_inactive(): void
    {
        $absensi = Absensi::create([
            'title' => 'Inactive Test',
            'slug' => 'inactive-test',
            'is_active' => false,
        ]);

        $this->assertFalse($absensi->is_active);
    }

    /**
     * Test that Absensi can be updated.
     */
    public function test_can_update_absensi(): void
    {
        $absensi = Absensi::create([
            'title' => 'Original Title',
            'slug' => 'original-slug',
            'is_active' => true,
        ]);

        $absensi->update([
            'title' => 'Updated Title',
            'is_active' => false,
        ]);

        $this->assertEquals('Updated Title', $absensi->fresh()->title);
        $this->assertEquals(0, $absensi->fresh()->is_active);
    }

    /**
     * Test that Absensi can be deleted.
     */
    public function test_can_delete_absensi(): void
    {
        $absensi = Absensi::create([
            'title' => 'To Be Deleted',
            'slug' => 'to-be-deleted',
            'is_active' => true,
        ]);

        $id = $absensi->id;
        $absensi->delete();

        $this->assertDatabaseMissing('absensi', [
            'id' => $id,
        ]);
    }

    /**
     * Test that Absensi has timestamps.
     */
    public function test_has_timestamps(): void
    {
        $absensi = Absensi::create([
            'title' => 'Timestamp Test',
            'slug' => 'timestamp-test',
            'is_active' => true,
        ]);

        $this->assertNotNull($absensi->created_at);
        $this->assertNotNull($absensi->updated_at);
    }

    /**
     * Test that Absensi fillable attributes work correctly.
     */
    public function test_fillable_attributes(): void
    {
        $data = [
            'title' => 'Fillable Test',
            'slug' => 'fillable-test',
            'is_active' => false,
        ];

        $absensi = new Absensi();
        $absensi->fill($data);
        $absensi->save();

        $this->assertEquals('Fillable Test', $absensi->title);
        $this->assertEquals('fillable-test', $absensi->slug);
        $this->assertFalse($absensi->is_active);
    }

    /**
     * Test that Absensi can be found by slug.
     */
    public function test_can_find_by_slug(): void
    {
        Absensi::create([
            'title' => 'Find By Slug',
            'slug' => 'find-by-slug',
            'is_active' => true,
        ]);

        $absensi = Absensi::where('slug', 'find-by-slug')->first();

        $this->assertNotNull($absensi);
        $this->assertEquals('Find By Slug', $absensi->title);
    }

    /**
     * Test filtering active Absensi records.
     */
    public function test_can_filter_active_absensi(): void
    {
        Absensi::create([
            'title' => 'Active 1',
            'slug' => 'active-1',
            'is_active' => true,
        ]);

        Absensi::create([
            'title' => 'Active 2',
            'slug' => 'active-2',
            'is_active' => true,
        ]);

        Absensi::create([
            'title' => 'Inactive',
            'slug' => 'inactive',
            'is_active' => false,
        ]);

        $activeAbsensi = Absensi::where('is_active', true)->get();

        $this->assertCount(2, $activeAbsensi);
    }

    /**
     * Test that Absensi table name is correct.
     */
    public function test_table_name_is_correct(): void
    {
        $absensi = new Absensi();

        $this->assertEquals('absensi', $absensi->getTable());
    }

    /**
     * Test mass assignment protection.
     */
    public function test_mass_assignment_protection(): void
    {
        $absensi = Absensi::create([
            'title' => 'Mass Assignment Test',
            'slug' => 'mass-assignment-test',
            'is_active' => true,
            'non_fillable_attribute' => 'This should not be set',
        ]);

        $this->assertArrayNotHasKey('non_fillable_attribute', $absensi->getAttributes());
    }
}
