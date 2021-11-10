<template>
    <!-- Main Content -->
    <main class="body-content">
        <MainHeader />
        <!-- Body Content Wrapper -->
        <div class="ms-content-wrapper">
            <div class="row" v-show="show_report == 1">
                <div class="col-xl-3 col-md-6">
                    <div
                        class="
                            ms-card
                            card-gradient-success
                            ms-widget ms-infographics-widget
                        "
                    >
                        <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Amount (Naira)</h6>
                                <p class="ms-card-change">
                                    &#8358; {{ in_naira["amount"] }}
                                </p>
                                <p class="fs-12"></p>
                            </div>
                        </div>
                        <i class="fa fa-users"></i>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div
                        class="
                            ms-card
                            card-gradient-secondary
                            ms-widget ms-infographics-widget
                        "
                    >
                        <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Profit (Naira)</h6>
                                <p class="ms-card-change">
                                    &#8358; {{ in_naira["profit"] }}
                                </p>
                                <p class="fs-12"></p>
                            </div>
                        </div>
                        <i class="fa fa-building"></i>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div
                        class="
                            ms-card
                            card-gradient-success
                            ms-widget ms-infographics-widget
                        "
                    >
                        <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Amount (USD)</h6>
                                <p class="ms-card-change">
                                    $ {{ in_usd["amount"] }}
                                </p>
                                <p class="fs-12"></p>
                            </div>
                        </div>
                        <i class="fa fa-users"></i>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div
                        class="
                            ms-card
                            card-gradient-secondary
                            ms-widget ms-infographics-widget
                        "
                    >
                        <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Profit (USD)</h6>
                                <p class="ms-card-change">
                                    $ {{ in_usd["profit"] }}
                                </p>
                                <p class="fs-12"></p>
                            </div>
                        </div>
                        <i class="fa fa-building"></i>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-12 col-md-12">
                    <div class="ms-panel">
						<div class="row">
							<div class="col-md-6">
								<br />
								<div class="form-group">
									<label for="">Start Date</label>
									<input
										type="date"
										class="form-control"
										v-model="start_date"
									/>
								</div>

								<div class="form-group">
									<label for="">End Date</label>
									<input
										type="date"
										class="form-control"
										v-model="end_date"
									/>
								</div>

								<div class="form-group">
									<button
										class="btn btn-primary btn-block btn-sm"
										@click="$fetch()"
										id="filter_btn"
									>
										Filter
									</button>
								</div>
							</div>

							<div class="col-md-6" v-show="show_report == 1">
								<div class="table-responsive">
									<table
										class="
											table
											table-bordered
											table-hover
											table-striped
										"
									>
										<thead>
											<tr>
												<th>Currency</th>
												<th>Amount</th>
												<th>Profit</th>
											</tr>
										</thead>

										<tbody>
											<tr>
												<td>{{ in_naira["currency"] }}</td>
												<td>{{ in_naira["amount"] }}</td>
												<td>{{ in_naira["profit"] }}</td>
											</tr>

											<tr>
												<td>{{ in_usd["currency"] }}</td>
												<td>{{ in_usd["amount"] }}</td>
												<td>{{ in_usd["profit"] }}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
                        <div class="ms-panel-header ms-panel-custom">
                            <div class="ms-heading">
                                <h6>Reports ()</h6>
                                <p></p>
                            </div>
                        </div>
                        <div class="ms-panel-body" v-show="show_report == 1">
                            <div class="row" style="float: right">
                                <select
                                    class="form-control"
                                    v-model="type"
                                    @change="filterSubscription($event)"
                                >
                                    <option value="new_subscription">
                                        New Subscriptions
                                    </option>
                                    <option value="subscription_renewal">
                                        Subscription Renewals
                                    </option>
                                </select>
                            </div>
							<br>
							<br>
							
							<div class="row">
                            	<ChartBarBase :chart-data="chartData" class="col-md-6" />

								<div class="col-md-6" v-show="show_report == 1">
									<v-client-table :data="all_report_transactions" :columns="report_columns" :options="report_table_options" class="table-responseive">
										<template v-slot:user="item">
											{{ item.row.user.fullname }}
										</template>

										<template v-slot:plan="item">
											{{ item.row.plan.name }}
										</template>
									</v-client-table>
								</div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import MainHeader from "~/components/MainHeader.vue";

import ChartBarBase from "~/components/ChartBarBase";

export default {
    layout: "main_default",
    components: {
        MainHeader,
        ChartBarBase,
    },

    mixins: [],

    head() {
        return {
            title: "Dashboard",
        };
    },

    data() {
        return {
            dashboard_info: [],
            start_date: "",
            end_date: "",
            show_report: 0,
            in_naira: {},
            in_usd: {},
            amount_in_naira: "",
            amount_in_usd: "",
            type: "",
            chartData: null,
			report_columns: ["user", "plan", "payment_plan", "currency", "amount", "selar_profit", "status", "created_at"],
            report_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [10, 25, 50, 100],
                preserveState: true,
                headings: {}
            },
			all_report_transactions: []
        };
    },

    methods: {
        selectSubscription() {
            if (this.type == "new_subscription") {
                this.in_naira = this.report.new_subscriptions.in_naira;
                this.in_usd = this.report.new_subscriptions.in_usd;
                this.amount_in_naira =
                    this.report.new_subscriptions.amount_in_naira;
                this.amount_in_usd =
                    this.report.new_subscriptions.amount_in_usd;

            }

            if (this.type == "subscription_renewal") {
                this.in_naira = this.report.recurring_subscriptions.in_naira;
                this.in_usd = this.report.recurring_subscriptions.in_usd;
                this.amount_in_naira =
                    this.report.recurring_subscriptions.amount_in_naira;
                this.amount_in_usd =
                    this.report.recurring_subscriptions.amount_in_usd;
            }

			this.all_report_transactions = []
			this.all_transactions.forEach(item => {
				if(item.type == this.type) {
					this.all_report_transactions.push(item)
				}
			})

			this.fillData();
        },

        async filterSubscription(event) {
            this.type = event.target.value;
            this.selectSubscription();
            //console.log(this.type);
        },

        fillData() {
			//console.log(this.in_naira['amount'].replaceAll(',', ''))
            this.chartData = {
                labels: ["Amount(NGN)", "Profit(NGN)"],
                datasets: [
                    {
                        backgroundColor: ["#E46651", "#41B883"],
                        data: [this.in_naira['amount'].replaceAll(',', ''), this.in_naira['profit'].replaceAll(',', '')],
                    },
                ],
            };
        },
    },

    async fetch() {
        const data = {
            start_date: this.start_date,
            end_date: this.end_date,
        };
        document.getElementById("filter_btn").disabled = true;
        this.report = await this.$axios.$post("/report/filter", data);
        if (this.report.status != "failed") {
            this.show_report = 1;
            this.type = "new_subscription";
			this.all_transactions = this.report.all_transactions
            this.selectSubscription();
        }
        document.getElementById("filter_btn").disabled = false;
        //console.log(this.report)
    },
};
</script>
