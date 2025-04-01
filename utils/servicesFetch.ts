import { BASE_URL } from '@/app/config/constants';
import { DryCleanItem } from '@/types/dryCleanItem';

export const getServices = async (): Promise<DryCleanItem[]> => {
	try {
		const res = await fetch(`${BASE_URL}/api/services`, {
			cache: 'no-store',
		});

		if (!res.ok) {
			console.error('API response error:', await res.text());
			throw new Error(`Failed to fetch services: ${res.status}`);
		}

		return res.json();
	} catch (err) {
		console.error('Error fetching services:', err);
		return [];
	}
};

export const createService = async (
	dataToSubmit: Partial<DryCleanItem>
): Promise<DryCleanItem | undefined> => {
	try {
		const res = await fetch(`${BASE_URL}/api/services`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataToSubmit),
		});

		if (!res.ok) {
			console.error('API response error:', await res.text());
			throw new Error(`Failed to create service: ${res.status}`);
		}

		return res.json();
	} catch (err) {
		console.error('Error creating service:', err);
		return;
	}
};

export const updateService = async (
	serviceId: number,
	dataToSubmit: DryCleanItem
): Promise<DryCleanItem | undefined> => {
	try {
		const res = await fetch(`${BASE_URL}/api/services/${serviceId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataToSubmit),
		});

		if (!res.ok) {
			console.error('API response error:', await res.text());
			throw new Error(`Failed to update service: ${res.status}`);
		}

		return res.json();
	} catch (err) {
		console.error('Error updating service:', err);
		return;
	}
};

export const deleteService = async (serviceId: number): Promise<void> => {
	try {
		const res = await fetch(`/api/services/${serviceId}`, {
			method: 'DELETE',
		});

		if (!res.ok) {
			console.error('API response error:', await res.text());
			throw new Error(`Failed to delete service: ${res.status}`);
		}
	} catch (err) {
		console.error('Error deleting service:', err);
		return;
	}
};

export const uploadImage = async (
	formData: FormData,
	file: File
): Promise<any> => {
	try {
		formData.append('image', file);

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		if (!res.ok) {
			console.error('API response error:', await res.text());
			throw new Error(`Failed to upload image: ${res.status}`);
		}

		return res.json();
	} catch (err) {
		console.error('Error uploading image:', err);
		return;
	}
};
