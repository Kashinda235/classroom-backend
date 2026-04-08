import { eq } from 'drizzle-orm';
import { db } from './db';
import { departments } from './db/schema';

async function main() {
 	try {
 		console.log('Performing CRUD operations...');

 		const [newDept] = await db
 			.insert(departments)
 			.values({ code: 'CS', name: 'Computer Science' })
 			.returning();

 		if (!newDept) throw new Error('Failed to create department');
 		console.log('✅ CREATE:', newDept);

 		const found = await db.select().from(departments).where(eq(departments.id, newDept.id));
 		console.log('✅ READ:', found[0]);

 		const [updated] = await db
 			.update(departments)
 			.set({ name: 'Computer Science & Engineering' })
 			.where(eq(departments.id, newDept.id))
 			.returning();

 		if (!updated) throw new Error('Failed to update user');
 		console.log('✅ UPDATE:', updated);

 		await db.delete(departments).where(eq(departments.id, newDept.id));
 		console.log('✅ DELETE: department removed');

 		console.log('\nCRUD operations completed successfully.');
	} catch (err) {
		console.error('Error during CRUD:', err);
		process.exit(1);
	}
}

main();

