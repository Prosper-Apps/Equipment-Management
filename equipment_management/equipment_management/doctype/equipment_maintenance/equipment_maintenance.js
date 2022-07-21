// Copyright (c) 2022, Deepak Kumar and contributors
// For license information, please see license.txt

frappe.ui.form.on('Equipment Maintenance', {
	refresh: function(frm) {
		if (frm.is_new()) {
			frm.set_value('posting_time',frappe.datetime.now_time())
			frm.set_df_property('edit_posting_time','hidden',0)
		}
		cur_frm.add_custom_button(__('View Log Book'), function () {
			frappe.set_route('query-report', 'Equipment Ledger',
					{equipment: frm.doc.equipment});
		});

		if (!frappe.user.has_role('System Manager') && frappe.user.has_role('eusectra basic User')) {
			frm.set_df_property('equipment_status', 'hidden',1)
			frm.set_df_property('status', 'hidden',1)
		}
	},
	edit_posting_time: function(frm) {
		if (frm.is_new()) {
			if (frm.doc.edit_posting_time) {
				frm.set_df_property('posting_date','read_only',0)
				frm.set_df_property('posting_time','read_only',0)
			} else {
				frm.set_df_property('posting_date','read_only',1)
				frm.set_df_property('posting_time','read_only',1)
			}
		}
	}
});
